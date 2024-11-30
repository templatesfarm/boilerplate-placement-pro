
import { TechnologiesType } from '@/app/types/portfolio.types';
import { serverRoutes } from '@/lib/contants';
import {create} from 'zustand';

interface SkillsStore {
  skills: TechnologiesType;
  isLoading: boolean;
  saveSelectedSkills: (skills: TechnologiesType) => void;
  fetchSkills: () => void;
}

export const useSkillsStore = create<SkillsStore>((set) => ({
  skills: {} as TechnologiesType,
  isLoading: true,
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
      console.log("🚀 ~ saveSelectedSkills: ~ data:", data)
      if (!response.ok) {
        set({ isLoading: false });
        throw new Error("Failed to save personal information");
      }
      set({
        skills: data.skills as TechnologiesType,
        isLoading:false
      });
    } catch (error) {
      console.log("🚀 ~ saveSelectedSkills: ~ error:", error)
      set({ isLoading: false });
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

      if (!response.ok) {
        set({ isLoading: false });
        throw new Error("Failed to fetch Skills information");
      }

      const {skills = {}} = await response.json();
      set({
        skills: skills as TechnologiesType,
        isLoading: false,
      });
    } catch (error) {
    console.log("🚀 ~ fetchSkills: ~ error:", error)
    set({ isLoading: false });
    }
  },
}));