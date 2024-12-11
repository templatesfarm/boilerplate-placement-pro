"use client";
import { useSkillsStore } from "@/store/skillStore";
import React, { useEffect } from "react";
import { SkillsSkeleton } from "../Loaders";
import { useAppStore } from "@/store/appStore";
import { SkillsBasic } from "portfolioui";

const Skills = () => {
  const { skills, fetchSkills, isLoading, saveSelectedSkills } =
    useSkillsStore();
  const { isEditing } = useAppStore();

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  if (isLoading) {
    return <SkillsSkeleton />;
  }

  return (
    <SkillsBasic
      saveSelectedSkills={saveSelectedSkills}
      skills={skills}
      isEditing={isEditing}
    />
  );
};

export default Skills;
