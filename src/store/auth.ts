import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  phone: string | null;
  timerSeconds: number | null;
  setPhone: (phone: string) => void;
  setTimerSeconds: (timerSeconds: number) => void;
  resetTimer: () => void;
  reset: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      phone: "",
      timerSeconds: 0,
      setPhone: (phone) => set({ phone }),
      setTimerSeconds: (timerSeconds) => set({ timerSeconds }),
      resetTimer: () => set({ phone: "", timerSeconds: 0 }),
      reset: () => {
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

export const usePhone = () => useAuthStore((state) => state.phone);
export const useTimerSeconds = () =>
  useAuthStore((state) => state.timerSeconds);
export const setPhone = (phone: string) =>
  useAuthStore.getState().setPhone(phone);
export const setTimerSeconds = (timerSeconds: number) =>
  useAuthStore.getState().setTimerSeconds(timerSeconds);
export const resetTimer = () => useAuthStore.getState().resetTimer();
export const useReset = () => useAuthStore.getState().reset();
