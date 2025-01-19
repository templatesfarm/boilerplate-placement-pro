import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "../FileUpload/FileUpload";
import { ProjectsInfoType, ProjectType } from "./project.types";

const initialProject = {
  timeline: "",
  projectName: "",
  headline1: "",
  headline2: "",
  designation: "",
  link: "",
  cover: "",
  skills: "",
  companyName: "",
  clientName: "",
  images: [],
};

interface ProjectDialogProps {
  isOpen: boolean;
  onOpenChange: (x: boolean) => void;
  projectsInfo: ProjectsInfoType;
  saveProjectsInfo: (x: ProjectsInfoType) => void;
}

export const ProjectsTimelineDialog: React.FC<ProjectDialogProps> = ({
  isOpen,
  onOpenChange,
  projectsInfo,
  saveProjectsInfo,
}) => {
  const [error] = useState<string | null>(null);
  const [titleOfProjects, setTitleOfProjects] = useState<string>(
    projectsInfo.displayName
  );
  const [localProjects, setLocalProjects] = useState<ProjectType[]>([
    {
      ...initialProject,
    },
  ]);

  useEffect(() => {
    setLocalProjects(projectsInfo.projects);
  }, [projectsInfo.projects]);

  const updateProjects = (index: number, projectDetail: ProjectType) => {
    setLocalProjects((prev) => {
      const newProjects = [...prev];
      newProjects[index] = projectDetail;
      return newProjects;
    });
  };

  const addProject = () => {
    setLocalProjects((prev) => [
      ...prev,
      {
        ...initialProject,
      },
    ]);
  };

  const handleSave = async () => {
    saveProjectsInfo({
      displayName: titleOfProjects,
      projects: localProjects,
    } as ProjectsInfoType);
    onOpenChange?.(false);
  };

  const handleRemoveProject = (index: number) => {
    setLocalProjects((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenChange?.(false)}>
      <DialogOverlay />
      <DialogContent className="overflow-auto max-h-[90%] space-y-4 z-50">
        <DialogTitle>Add Projects</DialogTitle>
        <Label className="block mb-2">Section Title</Label>
        <Input
          type="text"
          name="SectionTitle"
          value={titleOfProjects}
          onChange={(e) => setTitleOfProjects(e.target.value)}
          className="border p-2 w-full"
        />
        <DialogDescription>
          Enter the details of the projects below.
        </DialogDescription>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {localProjects.map((project, index) => (
          <ProjectDetail
            key={project.projectName + index}
            project={project}
            index={index}
            updateProjects={updateProjects}
            handleRemoveProject={handleRemoveProject}
          />
        ))}
        <div className="mt-4 flex justify-end space-x-4">
          <Button
            onClick={addProject}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Another Project
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectsTimelineDialog;

type ProjectDetailType = {
  project: ProjectType;
  index?: number;
  updateProjects: (index: number, project: ProjectType) => void;
  handleRemoveProject: (index: number) => void;
};

const ProjectDetail: React.FC<ProjectDetailType> = ({
  project,
  index = 0,
  updateProjects,
  handleRemoveProject,
}) => {
  const [projectDetails, setProjectDetails] = useState<ProjectType>(project);
  const skillsInputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setProjectDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleImageUrl = useCallback(
    (imageUrl: string) => {
      setProjectDetails((prev) => {
        if (prev.images.includes(imageUrl)) {
          return prev; // If it exists, return the previous state without changes
        }

        return {
          ...prev,
          images: [...prev?.images, imageUrl],
        };
      });
      skillsInputRef.current?.focus();
    },
    [projectDetails.images]
  );

  const handleBlur = useCallback(() => {
    updateProjects(index, projectDetails);
  }, [index, projectDetails, updateProjects]);

  return (
    <div className="space-y-4 border-t-2 border-gray-500 pt-5">
      <div className="flex justify-between items-center">
        <Label>{`Project ${index + 1}`}</Label>
        <Button
          onClick={() => handleRemoveProject(index)}
          className="bg-red-800"
        >
          Remove
        </Button>
      </div>
      <div className="mt-4">
        <Label className="block mb-2">Timeline</Label>
        <Input
          type="text"
          name="timeline"
          value={projectDetails.timeline}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border p-2 w-full"
          placeholder="e.g. 2023-24"
        />
      </div>
      <div className="mt-4">
        <Label className="block mb-2">Project Name</Label>
        <Input
          type="text"
          name="projectName"
          value={projectDetails.projectName}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border p-2 w-full"
          placeholder="Content Management System"
        />
      </div>
      <div className="mt-4">
        <Label className="block mb-2">Headline 1</Label>
        <Input
          type="text"
          name="headline1"
          value={projectDetails.headline1}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border p-2 w-full"
          placeholder="I worked on the project from scratch and took it to 1lac subscribers"
        />
      </div>
      <div className="mt-4">
        <Label className="block mb-2">Headline 2</Label>
        <Input
          type="text"
          name="headline2"
          value={projectDetails.headline2}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border p-2 w-full"
          placeholder="I've managed a team of 12 Software Engineers."
        />
      </div>
      <div className="mt-4">
        <Label className="block mb-2">Designation</Label>
        <Input
          type="text"
          name="designation"
          value={projectDetails.designation}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border p-2 w-full"
          placeholder="Software Engineer"
        />
      </div>
      <div className="mt-4">
        <Label className="block mb-2">Link</Label>
        <Input
          type="text"
          name="link"
          value={projectDetails.link}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border p-2 w-full"
          placeholder="Your project URL"
        />
      </div>

      <div className="mt-4">
        <Label className="block mb-2">Skills</Label>
        <Input
          ref={skillsInputRef}
          type="text"
          name="skills"
          value={projectDetails.skills}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border p-2 w-full"
          placeholder="Separate skills with comma like Java, JavaScript, React"
        />
      </div>
      <div className="mt-4">
        <Label className="block mb-2">Company Name</Label>
        <Input
          type="text"
          name="companyName"
          value={projectDetails.companyName}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border p-2 w-full"
        />
      </div>
      <div className="mt-4">
        <Label className="block mb-2">Client Name</Label>
        <Input
          type="text"
          name="clientName"
          value={projectDetails.clientName}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border p-2 w-full"
          placeholder="Keep it blank if no client"
        />
      </div>
      {projectDetails.images.map((image: string, index: number) => (
        <p key={image + index}>{image}</p>
      ))}
      <div className="mt-4" onBlur={handleBlur}>
        <FileUpload setImageUrl={handleImageUrl} />
        {/* <Input
          type="text"
          name="cover"
          value={projectDetails.imageUrl}
          disabled
          // onChange={(e) => handleChange(e)}
          className="border p-2 w-full"
        /> */}
      </div>
    </div>
  );
};
