import React, { useState } from "react";
import EditComponent from "../EditComponent";
import ProjectsTimelineDialog from "./ProjectsTimelineDialog";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useAppStore } from "@/store/appStore";
import { ProjectsTimelinePreview } from "./ProjectsTimelinePreview";
import { ProjectsInfoType } from "./project.types";

export interface ProjectsBasicProps {
  isEditing: boolean;
  projectsInfo: ProjectsInfoType;
  saveProjectsInfo: (x: ProjectsInfoType) => void;
}

export const ProjectsPlacementPro = () => {
  const {
    saveProjectsInfo,
    portfolio: { projectsInfo },
  } = usePortfolioStore();
  const { isEditing } = useAppStore();
  return (
    <ProjectsEditable
      isEditing={isEditing}
      saveProjectsInfo={saveProjectsInfo}
      projectsInfo={projectsInfo}
    />
  );
};

export const ProjectsEditable: React.FC<ProjectsBasicProps> = ({
  isEditing,
  projectsInfo,
  saveProjectsInfo,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      {isEditing ? (
        <EditComponent
          isEditing={isEditing}
          handleEditClick={() => setIsDialogOpen(true)}
        >
          {/* {projectsInfo.projects?.length > 0 && <ProjectsTimelinePreview />} */}
          <ProjectsTimelinePreview projectsInfo={projectsInfo} />
          <ProjectsTimelineDialog
            isOpen={isDialogOpen}
            onOpenChange={() => setIsDialogOpen(false)}
            saveProjectsInfo={saveProjectsInfo}
            projectsInfo={projectsInfo}
          />
        </EditComponent>
      ) : (
        <ProjectsTimelinePreview projectsInfo={projectsInfo} />
      )}
    </>
  );
};
