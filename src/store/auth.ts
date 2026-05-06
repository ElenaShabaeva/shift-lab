import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  phone: string;
  timerSeconds: number;
  isResend: boolean;
  setPhone: (phone: string) => void;
  setTimerSeconds: (timerSeconds: number) => void;
  setIsResend: (isResend: boolean) => void;
  resetTimer: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      phone: "",
      timerSeconds: 0,
      isResend: false,
      setPhone: (phone) => set({ phone }),
      setTimerSeconds: (timerSeconds) => set({ timerSeconds }),
      setIsResend: (isResend) => set({ isResend }),
      resetTimer: () => set({ timerSeconds: 0, isResend: true }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        phone: state.phone,
        timerSeconds: state.timerSeconds,
        isResend: state.isResend,
      }),
    },
  ),
);

export const usePhone = () => useAuthStore((state) => state.phone);
export const useTimerSeconds = () =>
  useAuthStore((state) => state.timerSeconds);
export const useIsResend = () => useAuthStore((state) => state.isResend);
export const setPhone = (phone: string) =>
  useAuthStore.getState().setPhone(phone);
export const setTimerSeconds = (timerSeconds: number) =>
  useAuthStore.getState().setTimerSeconds(timerSeconds);
export const setIsResend = (isResend: boolean) =>
  useAuthStore.getState().setIsResend(isResend);
export const resetTimer = () => useAuthStore.getState().resetTimer();
