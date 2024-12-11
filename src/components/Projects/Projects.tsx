import { useProjectStore } from "@/store/projectStore";
import React, { useEffect } from "react";
import { ProjectsSkeleton } from "../Loaders";
import { useAppStore } from "@/store/appStore";
import { ProjectsBasic } from "portfolioui";

export const Projects = () => {
  const {
    projects = [],
    fetchProjectsSection,
    isLoading,
    saveProjects,
  } = useProjectStore();
  const { isEditing } = useAppStore();

  useEffect(() => {
    fetchProjectsSection();
  }, [fetchProjectsSection]);

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  return (
    <ProjectsBasic
      isEditing={isEditing}
      projects={projects}
      saveProjects={saveProjects}
    />
  );
};
