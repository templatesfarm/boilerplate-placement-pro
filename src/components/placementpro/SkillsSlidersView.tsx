import React from "react";
import SkillSlider from "./SkillSlider";
import { SkillsSlidersType } from "./skillsSliders.types";

export const SkillsSlidersView = ({
  skillsInfo,
}: {
  skillsInfo: SkillsSlidersType;
}) => {
  return (
    <div className="max-w-7xl mx-auto pb-24 w-[80%]">
      <h4 className="mx-auto w-fit mb-24 mt-12 text-3xl">
        {skillsInfo.displayName}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-16">
        {skillsInfo.skills.map((skill, index) => (
          <SkillSlider
            name={skill.name}
            rating={skill.rating}
            key={skill.name + index}
          />
        ))}
      </div>
    </div>
  );
};
