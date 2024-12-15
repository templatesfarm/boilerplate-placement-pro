"use client";
import React from "react";
import { HeroSkeleton } from "../Loaders";
import { useAppStore } from "@/store/appStore";
import { HeroBasic } from "portfolioui";
import { usePortfolioStore } from "@/store/usePortfolioStore";

const Hero = () => {
  const { portfolio, saveHeroInfo, isLoading } = usePortfolioStore();
  const { isEditing } = useAppStore();

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <HeroBasic
      isEditing={isEditing}
      heroInfo={portfolio.heroInfo}
      saveHeroInfo={saveHeroInfo}
      personalInfo={portfolio.personalInfo}
    />
  );
};

export default Hero;
