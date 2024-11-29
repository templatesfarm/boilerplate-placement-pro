import { create } from "zustand";
import { HeroType } from "@/app/types/portfolio.types";
import { serverRoutes } from "@/lib/contants";

interface HeroStore {
  heroInfo: HeroType
  isLoading: boolean;
  saveHeroInfo: (info: HeroType) => void;
  fetchHeroSection: () => Promise<void>;
}

export const useHeroStore = create<HeroStore>((set) => ({
  heroInfo: {
    message: "",
    introduction: "",
    description: "",
  },
  isLoading: true,
  saveHeroInfo: async (info: HeroType) => {
    set({ isLoading: true });
    try {
      const response = await fetch(serverRoutes.HERO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      const data = await response.json();
      console.log("🚀 ~ saveHeroSection: ~ data:", data)
      if (!response.ok) {
        throw new Error("Failed to save personal information");
      }
      set({
        heroInfo: data,
        isLoading:false
      });
    } catch (error) {
      console.log("🚀 ~ saveHeroSection: ~ error:", error)
      set({ isLoading: false });
    }
  },
  fetchHeroSection: async () => {
    try {
      const response = await fetch(serverRoutes.HERO, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Hero information");
      }

      const data: HeroType = await response.json();
      console.log("🚀 ~ fetchHeroSection: ~ data:", data)
      set({
        heroInfo: data,
        isLoading: false,
      });
    } catch (error) {
      console.log("🚀 ~ fetchHeroSection: ~ error:", error)
    }
  },
}));
