import { useEffect } from "react";
import { setTimerSeconds, useTimerSeconds } from "@/store/auth";

export const useTimer = () => {
  const timerSeconds = useTimerSeconds();

  useEffect(() => {
    if (timerSeconds <= 0) return;

    const interval = setInterval(() => {
      setTimerSeconds(timerSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerSeconds, setTimerSeconds]);

  return {
    timerSeconds,
    isExpired: timerSeconds <= 0,
  };
};
