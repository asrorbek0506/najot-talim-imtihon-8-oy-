import { create } from "zustand";
import type { IUserStore } from "../types/user.store.type";
import type { AuthUser } from "../types/auth.type";

const useUserStore = create<IUserStore>((set) => {
  return {
    user: null,
    isAuthenticated: false,
    setUser: (user: AuthUser | null | undefined) => {
      set((state) => ({
        ...state,
        user: user ?? null,
        isAuthenticated: Boolean(user),
      }));
    },
    logout: () => {
      set((state) => ({ ...state, user: null, isAuthenticated: false }));
    },
  };
});
export default useUserStore;