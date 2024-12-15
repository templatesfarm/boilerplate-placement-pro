import React from "react";
import { ProjectsSkeleton } from "../Loaders";
import { useAppStore } from "@/store/appStore";
import { ProjectsBasic } from "portfolioui";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export const Projects = () => {
  const { isLoading, portfolio, saveProjectsInfo } = usePortfolioStore();
  const { isEditing } = useAppStore();

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  return (
    <ProjectsBasic
      isEditing={isEditing}
      projects={portfolio.projects}
      saveProjects={saveProjectsInfo}
    />
  );
};
