import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconFileCv,
  IconHome,
} from "@tabler/icons-react";
import { useDownload } from "@/app/hooks/download";

export function FloatingDockDemo() {
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
      onClick: handleDownload,
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      href: "https://originui.com/alerts-notifications-banners",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-700 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];
  return (
    <div className="flex items-center justify-center w-full fixed top-8 z-[100]">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
