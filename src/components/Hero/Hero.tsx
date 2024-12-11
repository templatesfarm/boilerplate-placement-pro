"use client";
import React, { useEffect } from "react";
import { useHeroStore } from "@/store/heroStore";
import { HeroSkeleton } from "../Loaders";
import { usePersonalStore } from "@/store/personalStore";
import { useAppStore } from "@/store/appStore";
import { HeroBasic } from "portfolioui";

const Hero = () => {
  const { heroInfo, fetchHeroSection, isLoading, saveHeroInfo } =
    useHeroStore();
  const { personalInfo } = usePersonalStore();
  const { isEditing } = useAppStore();

  useEffect(() => {
    fetchHeroSection();
  }, [fetchHeroSection]);

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <HeroBasic
      isEditing={isEditing}
      heroInfo={heroInfo}
      saveHeroInfo={saveHeroInfo}
      personalInfo={personalInfo}
    />
  );
};

export default Hero;
