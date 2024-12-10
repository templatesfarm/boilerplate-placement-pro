"use client";

import React, { useEffect } from "react";
import { ProfileSkeleton } from "../Loaders";
import { usePersonalStore } from "@/store/personalStore";
import { useAppStore } from "@/store/appStore";
import { NavbarBasic } from "portfolioui";

const Navbar = () => {
  const { personalInfo, fetchPersonalInfo, isLoading, savePersonalInfo } =
    usePersonalStore();
  const { isEditing } = useAppStore();

  useEffect(() => {
    fetchPersonalInfo();
  }, [fetchPersonalInfo]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <NavbarBasic
      isEditing={isEditing}
      personalInfo={personalInfo}
      savePersonalInfo={savePersonalInfo}
    />
  );
};

export default Navbar;
