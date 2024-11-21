import { create } from "zustand";
import {
  SiLinkedin,
  SiGithub,
  SiYoutube,
  SiFacebook,
  SiInstagram,
} from "react-icons/si";
import { PersonalInfo, SocialMedia } from "@/app/types/portfolio.types";
import { serverRoutes } from "@/lib/contants";

interface PersonalStore {
  personalInfo: PersonalInfo;
  isLoading: boolean;
  setPersonalInfo: (info: PersonalInfo) => void;
  setSocialMedia: (socialMedia: SocialMedia) => void;
  fetchPersonalInfo: () => Promise<void>;
}

export const usePersonalStore = create<PersonalStore>((set) => ({
  personalInfo: {
    name: "",
    contactNumber: "",
    email: "",
    socialMedia: {
      linkedin: {
        link: "https://www.linkedin.com/in/deepakpahawa/",
        icon: SiLinkedin,
      },
      github: {
        link: "",
        icon: SiGithub,
      },
      youtube: {
        link: "",
        icon: SiYoutube,
      },
      facebook: {
        link: "",
        icon: SiFacebook,
      },
      instagram: {
        link: "",
        icon: SiInstagram,
      },
    },
  },
  isLoading: true,
  setPersonalInfo: async (info: PersonalInfo) => {
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
      set((state) => ({
        personalInfo: {
          ...state.personalInfo,
          name: data.name,
          email: data.email,
          contactNumber: data.contactNumber,
          isLoading: false,
        },
      }));
    } catch (error) {
      console.error("Error fetching personal information:", error);
    }
  },
  setSocialMedia: (socialMedia: SocialMedia) => {
    set((state) => ({
      personalInfo: { ...state.personalInfo, socialMedia },
    }));
  },
}));
