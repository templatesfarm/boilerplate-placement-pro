"use client";
import React from "react";
import { SkillsSkeleton } from "../Loaders";
import { useAppStore } from "@/store/appStore";
import { SkillsBasic } from "portfolioui";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import SkillSlider from "../SkillSlider";

const Skills = () => {
  const { portfolio, saveSkillsInfo, isLoading } = usePortfolioStore();
  const { isEditing } = useAppStore();

  if (isLoading) {
    return <SkillsSkeleton />;
  }

  const skills = [
    {
      name: "NextJS",
      rating: 9,
    },
    {
      name: "ReactJS",
      rating: 8.5,
    },
    {
      name: "TypeScript",
      rating: 9.5,
    },
    {
      name: "JavaScript",
      rating: 10,
    },
    {
      name: "NextJS",
      rating: 9.5,
    },
    {
      name: "ReactJS",
      rating: 8.5,
    },
    {
      name: "TypeScript",
      rating: 8.5,
    },
    {
      name: "JavaScript",
      rating: 10,
    },
  ];

  return (
    // <SkillsBasic
    //   saveSelectedSkills={saveSkillsInfo}
    //   skillsInfo={portfolio.skillsInfo}
    //   isEditing={isEditing}
    // />
    <div className="max-w-7xl mx-auto pb-24 w-[80%]">
      <h4 className="mx-auto w-fit mb-24 mt-12">Skills</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-16">
        {skills.map((skill, index) => (
          <SkillSlider
            skillName={skill.name}
            rating={skill.rating}
            key={skill.name + index}
          />
        ))}
      </div>
    </div>
  );
};

export default Skills;
