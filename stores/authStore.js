import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLogin: false,
  login: () => set({ isLogin: true }),
  logout: () => set({ isLogin: false }),
}));
