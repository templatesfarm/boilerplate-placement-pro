import React, { useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconFileCv,
  IconHome,
} from "@tabler/icons-react";
import { useDownload } from "@/app/hooks/download";
import { cn } from "@/lib/utils";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { SkillsSkeleton } from "../Loaders";
import { useAppStore } from "@/store/appStore";
import EditComponent from "../EditComponent";
import PersonalInfoDialog from "./PersonalInfoDialog";
import { PersonalInfoType, SocialMediaType } from "./personalInfo.types";
import { useTheme } from "next-themes";

export const Dock = () => {
  const {
    portfolio: { personalInfo },
    savePersonalInfo,
    isLoading,
  } = usePortfolioStore();
  const { isEditing } = useAppStore();
  const { setTheme, theme, resolvedTheme } = useTheme();

  if (isLoading || !theme || !resolvedTheme) {
    return <SkillsSkeleton />;
  }

  return (
    <FloatingDockEditable
      isEditing={isEditing}
      personalInfo={personalInfo}
      savePersonalInfo={savePersonalInfo}
      setTheme={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      theme={theme}
    />
  );
};

export interface FloatingDockEditProps {
  isEditing: boolean;
  personalInfo: PersonalInfoType;
  savePersonalInfo: (x: PersonalInfoType) => void;
  setTheme: () => void;
  theme: string;
}

export const FloatingDockEditable: React.FC<FloatingDockEditProps> = ({
  isEditing,
  personalInfo,
  savePersonalInfo,
  setTheme,
  theme,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      {isEditing ? (
        <EditComponent
          isEditing={isEditing}
          handleEditClick={() => setIsDialogOpen(true)}
        >
          <FloatingDockDemo
            socialMediaLinks={personalInfo.socialMedia}
            resumeName={personalInfo.resumeName}
            setTheme={setTheme}
            theme={theme}
          />
          <PersonalInfoDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            personalInfo={personalInfo}
            savePersonalInfo={savePersonalInfo}
          />
        </EditComponent>
      ) : (
        <FloatingDockDemo
          socialMediaLinks={personalInfo.socialMedia}
          resumeName={personalInfo.resumeName}
          setTheme={setTheme}
          theme={theme}
        />
      )}
    </>
  );
};

export function FloatingDockDemo({
  socialMediaLinks,
  resumeName = "",
  className,
  setTheme,
  theme,
}: {
  socialMediaLinks: SocialMediaType;
  resumeName?: string;
  className?: string;
  setTheme: () => void;
  theme: string;
}) {
  const { handleDownload } = useDownload();
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Download CV",
      icon: (
        <IconFileCv className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      onClick: () => handleDownload(resumeName),
    },
    {
      title: "Youtube",
      icon: (
        <IconBrandYoutube className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      href: socialMediaLinks.youtube,
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      href: socialMediaLinks.linkedIn,
    },

    {
      title: "X",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      href: socialMediaLinks.xdotcom,
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      href: socialMediaLinks.github,
    },
  ];
  return (
    <div
      className={cn(
        "flex justify-evenly flex-row px-5 max-w-7xl mx-auto",
        className
      )}
    >
      <div className="flex items-center justify-center w-full fixed top-8 z-40">
        <FloatingDock
          // mobileClassName="translate-y-20" // only for demo, remove for production
          items={links}
          setTheme={setTheme}
          theme={theme}
        />
      </div>
    </div>
  );
}
