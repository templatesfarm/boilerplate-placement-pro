import { create } from "zustand";
import { PersonalInfo } from "@/app/types/portfolio.types";
import { serverRoutes } from "@/lib/contants";

interface PersonalStore {
  personalInfo: PersonalInfo;
  isLoading: boolean;
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
      linkedin: 'https://www.linkedin.com/in/deepakpahawa/',
      github: '',
      youtube: '',
      facebook: '',
      instagram: '',
    },
  },
  isLoading: true,
  savePersonalInfo: async (info: PersonalInfo) => {
    try {
      const response = await fetch(serverRoutes.PERSONAL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      const data = await response.json();
      console.log("🚀 ~ usePersonalStore ~ data:", data);
      set({
        personalInfo: data
      });
      if (!response.ok) {
        throw new Error("Failed to save personal information");
      }
    } catch (error) {
      console.error("Error saving personal information:", error);
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

      if (!response.ok) {
        throw new Error("Failed to fetch personal information");
      }

      const data: PersonalInfo = await response.json();
      console.log("🚀 ~ fetchPersonalInfo: ~ data:", data);
      set({
        personalInfo: data
      });
    } catch (error) {
      console.error("Error fetching personal information:", error);
    }
  },
}));
