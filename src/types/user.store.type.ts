import type { AuthUser } from "./auth.type";

export interface IUserStore {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null | undefined) => void;
  logout: () => void;
}
