"use client";
import { useSkillsStore } from "@/store/skillStore";
import EditComponent from "../EditComponent";
import Title from "../Title";
import { HoverEffectCard } from "../ui/card-hover-effect";
import SkillDialog from "./SkillDialog";
import React, { useEffect, useState } from "react";
import { SkillsSkeleton } from "../Loaders";
import { TechnologiesType } from "@/app/types/portfolio.types";
import { useAppStore } from "@/store/appStore";

interface SkillsViewProps {
  skills: TechnologiesType;
}

const SkillsView: React.FC<SkillsViewProps> = ({ skills }) => {
  return (
    <div className="mt-24 flex flex-col" id="skills">
      <Title
        title="Skills 🛠️"
        className="-rotate-6 inline-block float-center mx-auto text-foreground"
      />
      <HoverEffectCard items={skills} />
    </div>
  );
};

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

interface SkillBasicProps {
  isEditing: boolean;
  skills: TechnologiesType;
  saveSelectedSkills: (x: TechnologiesType) => void;
}

const SkillsBasic: React.FC<SkillBasicProps> = ({
  isEditing,
  skills,
  saveSelectedSkills,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <EditComponent
      isEditing={isEditing}
      handleEditClick={() => setIsDialogOpen(true)}
    >
      <SkillsView skills={skills} />
      <SkillDialog
        skills={skills}
        saveSelectedSkills={saveSelectedSkills}
        isOpen={isDialogOpen}
        onOpenChange={(flag: boolean = false) => setIsDialogOpen(flag)}
      />
    </EditComponent>
  );
};

export default Skills;
