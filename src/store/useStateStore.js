import { create } from "zustand";

export const useStateStore = create((set) => ({    
  hasShownWelcome: false,

  setHasShownWelcome: (value) => set({hasShownWelcome: value}),
}))