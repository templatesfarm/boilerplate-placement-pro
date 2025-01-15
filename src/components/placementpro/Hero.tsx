"use client";
import React, { useState } from "react";
import { HeroSkeleton } from "../Loaders";
import { useAppStore } from "@/store/appStore";
import { HeroType } from "portfolioui";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import EditComponent from "../EditComponent";
import { HeroBeamView } from "./HeroBeamView";
import HeroDialog from "../Hero/HeroDialog";

export const Hero = () => {
  const { portfolio, saveHeroInfo, isLoading } = usePortfolioStore();
  const { isEditing } = useAppStore();

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <HeroBeam
      isEditing={isEditing}
      heroInfo={portfolio.heroInfo}
      saveHeroInfo={saveHeroInfo}
    />
  );
};

export interface HeroBeamProps {
  isEditing: boolean;
  heroInfo: HeroType;
  saveHeroInfo: (x: HeroType) => void;
}

export const HeroBeam: React.FC<HeroBeamProps> = ({
  isEditing,
  heroInfo,
  saveHeroInfo,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      {isEditing ? (
        <EditComponent
          isEditing={isEditing}
          handleEditClick={() => setIsDialogOpen(true)}
        >
          <HeroBeamView heroInfo={heroInfo} />
          <HeroDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            saveHeroInfo={saveHeroInfo}
            heroInfo={heroInfo}
          />
        </EditComponent>
      ) : (
        <HeroBeamView heroInfo={heroInfo} />
      )}
    </>
  );
};
