import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SkillSliderType } from "./skillsSliders.types";
// import { useState } from "react";

export default function SkillSlider({ name, rating }: SkillSliderType) {
  // const [value, setValue] = useState([25]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Label className="leading-6">{name}</Label>
        <output className="text-sm font-medium tabular-nums">{rating}</output>
      </div>
      <Slider
        value={[rating * 10]}
        // onValueChange={setValue}
        aria-label="Slider with output"
      />
    </div>
  );
}
