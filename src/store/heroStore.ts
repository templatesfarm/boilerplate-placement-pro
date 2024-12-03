import { create } from "zustand";
import { HeroType } from "@/app/types/portfolio.types";
import { serverRoutes } from "@/lib/contants";

interface HeroStore {
  heroInfo: HeroType;
  isLoading: boolean;
  error: string;
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
  error: "",
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
      if (response.ok) {
        set({
          heroInfo: data,
          isLoading: false,
        });
      } else {
        set({ isLoading: false, error: "Failed to Save Hero Section" });
      }
    } catch (err) {
      const error = err as Error;
      set({ isLoading: false, error: error.message });
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

      if (response.ok) {
        const data: HeroType = await response.json();
        set({
          heroInfo: data,
          isLoading: false,
        });
      } else {
        set({ isLoading: false, error: "Failed to fetch Hero Section" });
      }
    } catch (err) {
      const error = err as Error;
      set({ isLoading: false, error: error.message });
    }
  },
}));
