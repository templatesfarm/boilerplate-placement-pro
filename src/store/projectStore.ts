import { create } from "zustand";
import { ProjectType } from "@/app/types/portfolio.types";
import { serverRoutes } from "@/lib/contants";
import { initialProject } from "@/lib/initialState/initialState";

interface ProjectStore {
  projects: ProjectType[];
  isLoading: boolean;
  error: string;
  saveProjects: (info: ProjectType[]) => void;
  fetchProjectsSection: () => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [
    {
      ...initialProject,
    },
  ],
  isLoading: true,
  error: "",
  saveProjects: async (projectsData: ProjectType[]) => {
    set({ isLoading: true });
    try {
      const response = await fetch(serverRoutes.PROJECTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectsData),
      });
      if (response.ok) {
        const data = await response.json();
        set({
          projects: data,
          isLoading: false,
        });
      } else {
        set({ error: "Failed to save personal information", isLoading: false });
      }
    } catch (err) {
      const error = err as Error;
      set({ error: error.message, isLoading: false });
    }
  },
  fetchProjectsSection: async () => {
    try {
      const response = await fetch(serverRoutes.PROJECTS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data: ProjectType[] = await response.json();
        const filteredData = data.filter(
          (project) => project.projectName !== ""
        );
        set({
          projects: filteredData,
          isLoading: false,
        });
      } else {
        set({
          error: "Failed to fetch Hero information",
          isLoading: false,
        });
      }
    } catch (err) {
      const error = err as Error;
      set({ error: error.message, isLoading: false });
    }
  },
}));
