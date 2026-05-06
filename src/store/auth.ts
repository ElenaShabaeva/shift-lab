import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  phone: string;
  setPhone: (phone: string) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      phone: "",
      setPhone: (phone) => set({ phone }),
    }),
    { name: "auth-storage" },
  ),
);

export const usePhone = () => useAuthStore((state) => state.phone);
export const setPhone = (phone: string) =>
  useAuthStore.getState().setPhone(phone);
