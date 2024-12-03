import { TechnologiesType } from "@/app/types/portfolio.types";
import { serverRoutes } from "@/lib/contants";
import { create } from "zustand";

interface SkillsStore {
  skills: TechnologiesType;
  isLoading: boolean;
  error: string;
  saveSelectedSkills: (skills: TechnologiesType) => void;
  fetchSkills: () => void;
}

export const useSkillsStore = create<SkillsStore>((set) => ({
  skills: {} as TechnologiesType,
  isLoading: true,
  error: "",
  saveSelectedSkills: async (newSkills) => {
    set({ isLoading: true });
    try {
      const response = await fetch(serverRoutes.SKILLS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSkills),
      });
      const data = await response.json();
      if (response.ok) {
        set({
          skills: data.skills as TechnologiesType,
          isLoading: false,
        });
      } else {
        set({ isLoading: false, error: "Failed to Save Skills" });
      }
    } catch (error) {
      set({ isLoading: false, error: (error as Error).message });
    }
  },

  fetchSkills: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(serverRoutes.SKILLS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const { skills = {} } = await response.json();
        set({
          skills: skills as TechnologiesType,
          isLoading: false,
        });
      } else {
        set({ isLoading: false, error: "Failed to fetch Skills information" });
      }
    } catch (error) {
      set({ isLoading: false, error: (error as Error).message });
    }
  },
}));
