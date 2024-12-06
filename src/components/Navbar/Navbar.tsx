"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import PersonalInfoDialog from "./PersonalInfoDialog";
import SocialMediaIcons from "../SocialMedia";
import { ProfileSkeleton } from "../Loaders";
import { usePersonalStore } from "@/store/personalStore";
import EditComponentNew from "../EditComponentNew";
import { PersonalInfo } from "@/app/types/portfolio.types";
import { useAppStore } from "@/store/appStore";
import { Button } from "portfolio-ui";

type NavbarViewProps = {
  personalInfo: PersonalInfo;
  className?: string;
};

const NavbarView: React.FC<NavbarViewProps> = ({ personalInfo, className }) => {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <div className="text-2xl font-bold underline underline-offset-8 decoration-green-500 -rotate-3">
        {personalInfo.name} 👨🏻‍💻
      </div>
      <SocialMediaIcons socialMedia={personalInfo.socialMedia} />
    </div>
  );
};

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

type NavbarBasicProps = {
  isEditing: boolean;
  personalInfo: PersonalInfo;
  savePersonalInfo: (x: PersonalInfo) => void;
};

const NavbarBasic: React.FC<NavbarBasicProps> = ({
  isEditing,
  personalInfo,
  savePersonalInfo,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <EditComponentNew
      isEditing={isEditing}
      handleEditClick={() => setIsDialogOpen(true)}
    >
      <Button>
        <p>Edit</p>
      </Button>
      <NavbarView personalInfo={personalInfo} />
      <PersonalInfoDialog
        isOpen={isDialogOpen}
        onOpenChange={(flag: boolean = false) => setIsDialogOpen(flag)}
        personalInfo={personalInfo}
        savePersonalInfo={savePersonalInfo}
      />
    </EditComponentNew>
  );
};
