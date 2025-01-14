import { create } from "zustand";

interface AppStore {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isEditing: true,
  setIsEditing: (isEditing) => set({ isEditing }),
}));
