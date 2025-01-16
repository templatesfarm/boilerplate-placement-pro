import React from "react";
import SkillSlider from "./AnimatedSlider";
import { SkillsSlidersType } from "./skillsSliders.types";
import { Skeleton } from "../ui/skeleton";

export const SkillsSlidersView = ({
  skillsInfo,
  isLoading = true,
}: {
  skillsInfo: SkillsSlidersType;
  isLoading: boolean;
}) => {
  return (
    <div className="max-w-7xl mx-auto pb-24 w-[80%]">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-48 w-[80%] md:w-[50%] mx-auto h-48">
          <Skeleton className="w-full h-12"></Skeleton>
          <Skeleton className="w-full h-12"></Skeleton>
          <Skeleton className="w-full h-12"></Skeleton>
          <Skeleton className="w-full h-12"></Skeleton>
          <Skeleton className="w-full h-12"></Skeleton>
          <Skeleton className="w-full h-12"></Skeleton>
        </div>
      ) : (
        <>
          <h4 className="mx-auto w-fit mb-24 mt-12 text-3xl">
            {skillsInfo.displayName}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-16">
            {skillsInfo.skills.map((skill, index) => (
              <SkillSlider
                label={skill.name}
                rating={skill.rating}
                key={skill.name + index}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
