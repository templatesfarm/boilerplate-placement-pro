import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
// import { useState } from "react";

type SkillSliderType = {
  skillName: string;
  rating: number;
};

export default function SkillSlider({ skillName, rating }: SkillSliderType) {
  // const [value, setValue] = useState([25]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Label className="leading-6">{skillName}</Label>
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
