"use client";
import React from "react";
import { SkillsSkeleton } from "../Loaders";
import { useAppStore } from "@/store/appStore";
import { SkillsBasic } from "portfolioui";
import { usePortfolioStore } from "@/store/usePortfolioStore";

const Skills = () => {
  const { portfolio, saveSkillsInfo, isLoading } = usePortfolioStore();
  const { isEditing } = useAppStore();

  if (isLoading) {
    return <SkillsSkeleton />;
  }

  return (
    <SkillsBasic
      saveSelectedSkills={saveSkillsInfo}
      skillsInfo={portfolio.skillsInfo}
      isEditing={isEditing}
    />
  );
};

export default Skills;
