import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ProjectType } from "@/app/types/portfolio.types";
import FileUpload from "../FileUpload/FileUpload";
import { initialProject } from "@/lib/initialState/initialState";
import { useProjectStore } from "@/store/projectStore";

interface ProjectDialogProps {
  isOpen?: boolean;
  onOpenChange?: (x: boolean) => void;
}

export const ProjectsDialog: React.FC<ProjectDialogProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [error, ] = useState<string | null>(null);
  const [localProjects, setLocalProjects] = useState<ProjectType[]>([
    {
      ...initialProject,
    },
  ]);

  const { projects, saveProjects } = useProjectStore();

  useEffect(() => {
    setLocalProjects(projects);
  }, [projects]);

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
    saveProjects(localProjects);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenChange?.(false)}>
      <DialogOverlay />
      <DialogContent className="overflow-auto max-h-[90%] space-y-4">
        <DialogTitle>Add New Projects</DialogTitle>
        <DialogDescription>
          Enter the details of the projects below.
        </DialogDescription>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {localProjects.map((project, index) => (
          <ProjectDetail
            key={index}
            project={project}
            index={index}
            updateProjects={updateProjects}
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

export default ProjectsDialog;

type ProjectDetailType = {
  project: ProjectType;
  index?: number;
  updateProjects: (index: number, project: ProjectType) => void;
};

const ProjectDetail: React.FC<ProjectDetailType> = ({
  project,
  index = 0,
  updateProjects,
}) => {
  const [projectDetails, setProjectDetails] = useState<ProjectType>(project);
  const skillsInputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  },[]);

  const handleImageUrl = useCallback((imageUrl: string) => {
    setProjectDetails((prev) => ({
      ...prev,
      imageUrl: imageUrl,
    }));
    skillsInputRef.current?.focus();
  },[]);

  const handleBlur = useCallback(() => {
    updateProjects(index, projectDetails);
  },[index, projectDetails, updateProjects]);


  return (
    <div className="space-y-4 border-t-2 border-gray-500" >
      <Label>{`Project ${index + 1}`}</Label>
      <div className="mt-4">
        <Label className="block mb-2">Project Name</Label>
        <Input
          type="text"
          name="projectName"
          value={projectDetails.projectName}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
          className="border p-2 w-full"
        />
      </div>
      <div className="mt-4">
        <Label className="block mb-2">Designation</Label>
        <Input
          type="text"
          name="designation"
          value={projectDetails.designation}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
          className="border p-2 w-full"
        />
      </div>
      <div className="mt-4">
        <Label className="block mb-2">Link</Label>
        <Input
          type="text"
          name="link"
          value={projectDetails.link}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
          className="border p-2 w-full"
        />
      </div>
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
      <div className="mt-4">
        <Label className="block mb-2">Skills</Label>
        <Input
        ref={skillsInputRef}
          type="text"
          name="skills"
          value={projectDetails.skills}
          onChange={(e) => handleChange(e)}
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
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
          className="border p-2 w-full"
        />
      </div>
      <div className="mt-4">
        <Label className="block mb-2">Start Date</Label>
        <Input
          type="date"
          name="startDate"
          value={projectDetails.startDate}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
          className="border p-2 w-full"
        />
      </div>
      <div className="mt-4">
        <Label className="block mb-2">End Date</Label>
        <Input
          type="date"
          name="endDate"
          value={projectDetails.endDate}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
};
