"use client";
import React, { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { HeroType } from "portfolioui";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import EditComponent from "../EditComponent";
import { HeroBeamView } from "./HeroBeamView";
import HeroDialog from "../Hero/HeroDialog";

export const Hero = () => {
  const { portfolio, saveHeroInfo, isLoading } = usePortfolioStore();
  const { isEditing } = useAppStore();

  return (
    <HeroBeam
      isEditing={isEditing}
      heroInfo={portfolio.heroInfo}
      saveHeroInfo={saveHeroInfo}
      isLoading={isLoading}
    />
  );
};

export interface HeroBeamProps {
  isEditing: boolean;
  heroInfo: HeroType;
  saveHeroInfo: (x: HeroType) => void;
  isLoading: boolean;
}

export const HeroBeam: React.FC<HeroBeamProps> = ({
  isEditing,
  heroInfo,
  saveHeroInfo,
  isLoading,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <EditComponent
      isEditing={isEditing}
      handleEditClick={() => setIsDialogOpen(true)}
    >
      <HeroBeamView heroInfo={heroInfo} isLoading={isLoading} />
      <HeroDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        saveHeroInfo={saveHeroInfo}
        heroInfo={heroInfo}
      />
    </EditComponent>
  );
};
