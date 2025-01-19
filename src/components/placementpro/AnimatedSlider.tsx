"use client";

import { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion, useAnimation, useInView } from "framer-motion";

interface AnimatedSliderProps {
  rating: number;
  label: string;
}

const MotionSlider = motion(Slider);

export default function AnimatedSlider({ rating, label }: AnimatedSliderProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.set({
        transition: { duration: 1.5, ease: "easeOut" },
      });
      const animationDuration = 1500; // 1.5 seconds
      const startTime = Date.now();

      const animateValue = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        setDisplayValue(Math.round(progress * rating * 10));

        if (progress < 1) {
          requestAnimationFrame(animateValue);
        }
      };

      requestAnimationFrame(animateValue);
    }
  }, [isInView, controls, rating]);

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
        animate={controls}
        min={0}
        max={100}
        step={0.5}
        aria-label={`${label} slider`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={displayValue}
      />
    </div>
  );
}
