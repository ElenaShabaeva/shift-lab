import { useCallback, useEffect, useRef } from "react";
import { useTimerSeconds, setTimerSeconds, setIsResend, useIsResend } from "@/store/auth";

export const useTimer = () => {
  const timerSeconds = useTimerSeconds();
  const isResend = useIsResend();
  const intervalRef = useRef<number | null>(null);

  const startTimer = useCallback((seconds: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setTimerSeconds(seconds);
    setIsResend(false);

    if (seconds <= 0) {
      setIsResend(true);
      return;
    }

    let currentSeconds = seconds;

    intervalRef.current = setInterval(() => {
      currentSeconds -= 1;
      setTimerSeconds(currentSeconds);

      if (currentSeconds <= 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsResend(true);
      }
    }, 1000);
  }, [setTimerSeconds, setIsResend]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setTimerSeconds(0);
    setIsResend(true);
  }, [stopTimer, setTimerSeconds, setIsResend]);

  useEffect(() => {
    if (timerSeconds > 0 && !isResend) {
      startTimer(timerSeconds);
    }
    
    return () => stopTimer();
  }, [timerSeconds, isResend, startTimer, stopTimer]);

  return { 
    timerSeconds, 
    isResend, 
    startTimer, 
    stopTimer, 
    resetTimer 
  };
};