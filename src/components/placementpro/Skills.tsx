"use client";
import React, { useState } from "react";
import { SkillsSkeleton } from "../Loaders";
import { useAppStore } from "@/store/appStore";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { SkillsSlidersType } from "./skillsSliders.types";
import EditComponent from "../EditComponent";
import { SkillsSlidersView } from "./SkillsSlidersView";
import { SkillsSlidersDialog } from "./SkillsSlidersDialog";

export const Skills = () => {
  const { portfolio, saveSkillsInfo, isLoading } = usePortfolioStore();
  const { isEditing } = useAppStore();

  if (isLoading) {
    return <SkillsSkeleton />;
  }

  return (
    // <SkillsBasic
    //   saveSelectedSkills={saveSkillsInfo}
    //   skillsInfo={portfolio.skillsInfo}
    //   isEditing={isEditing}
    // />
    <SkillsSliders
      saveSkillsInfo={saveSkillsInfo}
      skillsInfo={portfolio.skillsInfo}
      isEditing={isEditing}
    />
  );
};

export interface SkillsSlidersProp {
  isEditing: boolean;
  skillsInfo: SkillsSlidersType;
  saveSkillsInfo: (x: SkillsSlidersType) => void;
}

const SkillsSliders: React.FC<SkillsSlidersProp> = ({
  isEditing,
  skillsInfo,
  saveSkillsInfo,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      {isEditing ? (
        <EditComponent
          isEditing={isEditing}
          handleEditClick={() => setIsDialogOpen(true)}
        >
          <SkillsSlidersView skillsInfo={skillsInfo} />
          <SkillsSlidersDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            skillsInfo={skillsInfo}
            saveSkillsInfo={saveSkillsInfo}
          />
        </EditComponent>
      ) : (
        <SkillsSlidersView skillsInfo={skillsInfo} />
      )}
    </>
  );
};
