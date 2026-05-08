import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  phone: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        useUserStore.persist.clearStorage();
      },
    }),
    {
      name: "user-storage",
    },
  ),
);

export const useUser = () => useUserStore((state) => state.user);
export const setUser = (user: User) => useUserStore.getState().setUser(user);
export const logout = () => useUserStore.getState().logout();
