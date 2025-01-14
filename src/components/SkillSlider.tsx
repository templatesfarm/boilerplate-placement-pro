"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

type SkillSliderType = {
  skillName: string;
  rating: number;
};

const MotionSlider = motion(Slider);

export default function SkillSlider({ skillName, rating }: SkillSliderType) {
  const [value, setValue] = useState([0]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        transition: { duration: 1, ease: "easeOut" },
      });
      setValue([rating * 10]);
    }
  }, [isInView, controls, rating]);

  useEffect(() => {
    setValue([rating * 10]);
  }, [rating]);

  return (
    <div className="space-y-4" ref={ref}>
      <div className="flex items-center justify-between gap-2">
        <Label className="leading-6">{skillName}</Label>
        <output className="text-sm font-medium tabular-nums">
          {Math.round(value[0] / 10)}
        </output>
      </div>
      <MotionSlider
        value={value}
        onValueChange={setValue}
        animate={controls}
        aria-label="Slider with output"
        max={100}
      />
    </div>
  );
}
