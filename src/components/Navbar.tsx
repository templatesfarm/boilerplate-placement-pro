"use client";

import { cn } from "@/lib/utils";
import { usePersonalStore } from "@/store/personalStore";
import React, { useEffect } from "react";
import EditComponent from "./EditComponent";
import PersonalInfoDialog from "./PersonalInfoDialog";
import SocialMediaIcons from "./SocialMedia";

const Navbar = ({ className }: { className?: string }) => {
  const { personalInfo, fetchPersonalInfo } = usePersonalStore();

  useEffect(() => {
    fetchPersonalInfo();
  }, [fetchPersonalInfo]);

  return (
    <div className={cn("flex justify-between items-center", className)}>
      <div className="text-2xl font-bold underline underline-offset-8 decoration-green-500 -rotate-3">
        {personalInfo.name} 👨🏻‍💻
      </div>
      <SocialMediaIcons socialMedia={personalInfo.socialMedia} />
    </div>
  );
};

const NavbarWithDialog = () => {
  return <EditComponent comp={<Navbar />} dialog={<PersonalInfoDialog />} />;
};

export default NavbarWithDialog;
