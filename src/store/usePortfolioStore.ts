import { create } from "zustand";
import { serverRoutes } from "@/lib/contants";
import {
  HeroType,
  PersonalInfoType,
  ProjectsInfoType,
  SkillsInfoType,
} from "portfolioui";

const initialPersonalState: PersonalInfoType = {
  displayName: "",
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

const initialHeroState: HeroType = {
  displayName: "",
  message: "",
  introduction: "",
  description: "",
};

const initialSkillsState: SkillsInfoType = {
  displayName: "",
  skills: {},
};

const initialProjectState = {
  displayName: "",
  projects: [
    {
      projectName: "",
      designation: "",
      link: "",
      cover: "",
      skills: [] as string[],
      companyName: "",
      startDate: "",
      endDate: "",
      imageUrl: "",
    },
  ],
};

export interface PortfolioType {
  personalInfo: PersonalInfoType;
  heroInfo: HeroType;
  skillsInfo: SkillsInfoType;
  projectsInfo: ProjectsInfoType;
}

interface PortfolioStore {
  portfolio: PortfolioType;
  isLoading: boolean;
  error: string;
  savePortfolio: (x: PortfolioType) => void;
  savePersonalInfo: (x: PersonalInfoType) => void;
  saveHeroInfo: (x: HeroType) => void;
  saveProjectsInfo: (x: ProjectsInfoType) => void;
  saveSkillsInfo: (x: SkillsInfoType) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateState: (x: any) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  portfolio: {
    personalInfo: initialPersonalState,
    heroInfo: initialHeroState,
    skillsInfo: initialSkillsState,
    projectsInfo: initialProjectState,
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

  saveSkillsInfo: async (skillsInfo: SkillsInfoType) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      skillsInfo,
    } as PortfolioType);
  },

  saveProjectsInfo: async (projectsInfo: ProjectsInfoType) => {
    const currentPortfolio = get().portfolio;
    await get().savePortfolio({
      ...currentPortfolio,
      projectsInfo,
    } as PortfolioType);
  },

  updateState: (newState: PortfolioType) => {
    set({
      portfolio: newState,
      isLoading: false,
      error: "",
    });
  },
}));
