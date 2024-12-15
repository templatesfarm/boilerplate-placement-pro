"use client";

import React from "react";
import { ProfileSkeleton } from "../Loaders";
import { useAppStore } from "@/store/appStore";
import { NavbarBasic } from "portfolioui";
import { usePortfolioStore } from "@/store/usePortfolioStore";

const Navbar = () => {
  const { portfolio, savePersonalInfo, isLoading } = usePortfolioStore();
  const { isEditing } = useAppStore();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <>
      <NavbarBasic
        isEditing={isEditing}
        personalInfo={portfolio.personalInfo}
        savePersonalInfo={savePersonalInfo}
      />
    </>
  );
};

export default Navbar;
