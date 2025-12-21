import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    setTimeout(() => {
      set({
        user: { email },
        token: "dummy-token",
        isLoading: false,
      });
    }, 1000);
  },

  logout: () => set({ user: null, token: null }),
}));
