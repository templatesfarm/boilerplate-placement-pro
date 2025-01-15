"use client";
import React from "react";
import { HeroSkeleton } from "../Loaders";
import { useAppStore } from "@/store/appStore";
import { HeroBasic } from "portfolioui";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { HeroBeamView } from "../placementpro/HeroBeamView";

const HeroPro = () => {
  const { portfolio, saveHeroInfo, isLoading } = usePortfolioStore();
  const { isEditing } = useAppStore();

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return <HeroBeamView heroInfo={portfolio.heroInfo} />;
};

export default HeroPro;
