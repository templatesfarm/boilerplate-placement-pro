import { create } from "zustand";
import { serverRoutes } from "@/lib/contants";
import {
  HeroType,
  PersonalInfoType,
  ProjectType,
  TechnologiesType,
} from "portfolioui";

const initialHeroState: HeroType = {
  message: "",
  introduction: "",
  description: "",
};

const initialProjectState = {
  projectName: "",
  designation: "",
  link: "",
  cover: "",
  skills: [] as string[],
  companyName: "",
  startDate: "",
  endDate: "",
  imageUrl: "",
};

const initialPersonalState: PersonalInfoType = {
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
};

export interface PortfolioType {
  personalInfo: PersonalInfoType;
  heroInfo: HeroType;
  skills: TechnologiesType;
  projects: ProjectType[];
}

interface PortfolioStore {
  portfolio: PortfolioType;
  isLoading: boolean;
  error: string;
  savePortfolio: (portfolioData: PortfolioType) => void;
  savePersonalInfo: (info: PersonalInfoType) => void;
  saveHeroInfo: (info: HeroType) => void;
  saveProjectsInfo: (projects: ProjectType[]) => void;
  saveSkillsInfo: (skills: TechnologiesType) => void;
  updateState: (portfolioData: PortfolioType) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  portfolio: {
    personalInfo: initialPersonalState,
    heroInfo: initialHeroState,
    skills: {} as TechnologiesType,
    projects: [initialProjectState],
  },
  isLoading: true,
  error: "",

  savePortfolio: async (portfolioData: PortfolioType) => {
    set({ isLoading: true });
    try {
      const response = await fetch(serverRoutes.PORTFOLIO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      });
      if (response.ok) {
        const data = await response.json();
        set({
          portfolio: data,
          isLoading: false,
        });
      } else {
        set({ isLoading: false, error: "Failed to Save Portfolio Info" });
      }
    } catch (error) {
      set({ isLoading: false, error: (error as Error).message });
    }
  },

  savePersonalInfo: async (personalInfo: PersonalInfoType) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      personalInfo,
    } as PortfolioType);
  },

  saveHeroInfo: async (heroInfo: HeroType) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      heroInfo,
    } as PortfolioType);
  },

  saveSkillsInfo: async (skills: TechnologiesType) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      skills,
    } as PortfolioType);
  },

  saveProjectsInfo: async (projects: ProjectType[]) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      projects,
    } as PortfolioType);
  },

  updateState: (newState: PortfolioType) => {
    set({ portfolio: newState, isLoading: false, error: "" });
  },
}));
