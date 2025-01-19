"use client";

import { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

interface AnimatedSliderProps {
  rating: number;
  label: string;
}

const MotionSlider = motion(Slider);

export default function AnimatedSlider({ rating, label }: AnimatedSliderProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Easing function for smooth animation
  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const animationDuration = 1500; // 1.5 seconds
          const startTime = Date.now();

          const animateValue = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1); // Clamp between 0 and 1
            const easedProgress = easeInOutQuad(progress);
            setDisplayValue(Math.round(easedProgress * rating * 10));

            if (progress < 1) {
              requestAnimationFrame(animateValue);
            }
          };

          requestAnimationFrame(animateValue);
        }
      },
      { threshold: 1.0 } // Trigger when fully in view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [rating]);

  return (
    <div className="space-y-4" ref={ref}>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={`slider-${label}`} className="leading-6">
          {label}
        </Label>
        <output
          htmlFor={`slider-${label}`}
          className="text-sm font-medium tabular-nums"
        >
          {displayValue / 10}
        </output>
      </div>
      <MotionSlider
        id={`slider-${label}`}
        value={[displayValue]}
        min={0}
        max={100}
        step={1}
        aria-label={`${label} slider`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={displayValue}
      />
    </div>
  );
}
