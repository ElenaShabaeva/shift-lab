import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  userID: string;
  userPhone: string;
  setUserID: (id: string) => void;
  setUserPhone: (phone: string) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userID: '',
      userPhone: "",
      setUserID: (userID) => set({userID}),
      setUserPhone: (userPhone) => set({ userPhone }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        userID: state.userID,
        userPhone: state.userPhone,
      }),
    },
  ),
);

export const useUserID = () => useUserStore((state) => state.userID);
export const setUserID = (userID: string) => useUserStore.getState().setUserID(userID);
export const useUserPhone = () => useUserStore((state) => state.userPhone);
export const setUserPhone = (phone: string) =>
  useUserStore.getState().setUserPhone(phone);
