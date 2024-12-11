"use client";

import React, { useEffect } from "react";
import { ProfileSkeleton } from "../Loaders";
import { usePersonalStore } from "@/store/personalStore";
import { useAppStore } from "@/store/appStore";
import { NavbarBasic } from "portfolioui";
import { Button } from "../ui/button";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { setTheme, resolvedTheme, theme } = useTheme();
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
    <>
      <NavbarBasic
        isEditing={isEditing}
        personalInfo={personalInfo}
        savePersonalInfo={savePersonalInfo}
      />
      <Button
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </Button>
    </>
  );
};

export default Navbar;
