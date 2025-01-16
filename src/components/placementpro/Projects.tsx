import React, { useState } from "react";
import EditComponent from "../EditComponent";
import ProjectsTimelineDialog from "./ProjectsTimelineDialog";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useAppStore } from "@/store/appStore";
import { ProjectsTimelineView } from "./ProjectsTimelinePreview";
import { ProjectsInfoType } from "./project.types";
import { Skeleton } from "../ui/skeleton";

export interface ProjectsBasicProps {
  isEditing: boolean;
  projectsInfo: ProjectsInfoType;
  saveProjectsInfo: (x: ProjectsInfoType) => void;
  isLoading: boolean;
}

export const Projects = () => {
  const {
    saveProjectsInfo,
    portfolio: { projectsInfo },
    isLoading,
  } = usePortfolioStore();
  const { isEditing } = useAppStore();
  return (
    <ProjectsTimeline
      isEditing={isEditing}
      saveProjectsInfo={saveProjectsInfo}
      projectsInfo={projectsInfo}
      isLoading={isLoading}
    />
  );
};

const ProjectsTimeline: React.FC<ProjectsBasicProps> = ({
  isEditing,
  projectsInfo,
  saveProjectsInfo,
  isLoading,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-start items-center gap-4 w-[70%] md:w-[50%] mx-auto">
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
      </div>
    );
  }
  return (
    <>
      {isEditing ? (
        <EditComponent
          isEditing={isEditing}
          handleEditClick={() => setIsDialogOpen(true)}
        >
          <ProjectsTimelineView projectsInfo={projectsInfo} />
          <ProjectsTimelineDialog
            isOpen={isDialogOpen}
            onOpenChange={() => setIsDialogOpen(false)}
            saveProjectsInfo={saveProjectsInfo}
            projectsInfo={projectsInfo}
          />
        </EditComponent>
      ) : (
        <ProjectsTimelineView projectsInfo={projectsInfo} />
      )}
    </>
  );
};
