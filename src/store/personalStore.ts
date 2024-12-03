import { create } from "zustand";
import { PersonalInfo } from "@/app/types/portfolio.types";
import { serverRoutes } from "@/lib/contants";

interface PersonalStore {
  personalInfo: PersonalInfo;
  isLoading: boolean;
  error: string;
  savePersonalInfo: (info: PersonalInfo) => void;
  // setSocialMedia: (socialMedia: SocialMedia) => void;
  fetchPersonalInfo: () => Promise<void>;
}

export const usePersonalStore = create<PersonalStore>((set) => ({
  personalInfo: {
    name: "",
    contactNumber: "",
    email: "",
    socialMedia: {
      linkedin: "",
      github: "",
      youtube: "",
      facebook: "",
      instagram: "",
    },
  },
  isLoading: true,
  error: "",
  savePersonalInfo: async (info: PersonalInfo) => {
    set({ isLoading: true });
    try {
      const response = await fetch(serverRoutes.PERSONAL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (response.ok) {
        const data = await response.json();
        set({
          personalInfo: data,
          isLoading: false,
        });
      } else {
        set({ isLoading: false, error: "Failed to Save Personal Info" });
      }
    } catch (error) {
      set({ isLoading: false, error: (error as Error).message });
    }
  },
  fetchPersonalInfo: async () => {
    try {
      const response = await fetch(serverRoutes.PERSONAL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data: PersonalInfo = await response.json();
        set({
          personalInfo: data,
          isLoading: false,
        });
      } else {
        set({
          isLoading: false,
          error: "Failed to fetch personal information",
        });
      }
    } catch (error) {
      set({ isLoading: false, error: (error as Error).message });
    }
  },
}));
