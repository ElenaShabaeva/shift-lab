import { useTimer } from "@/hooks/useTimer";
import { useGetCode } from "@/hooks/useAuth";
import { usePhone } from "@/store/auth";
import Button from "@/shared/Button";
import styles from "./Timer.module.scss"

const Timer = () => {
  const { timerSeconds, isResend } = useTimer();
  const phone = usePhone()

  const getCodeMutation = useGetCode();
  const handleClick = () => {
    getCodeMutation.mutate(phone);
  }


  if (!isResend) {
    return (
      <p className={`${styles.text} p-14`}>
        Запросить код повторно можно через <span>{timerSeconds}</span> секунд
      </p>
    );
  }

  return (
    <Button variant="secondary" className={`${styles.button}`} onClick={handleClick}>Запросить код ещё раз</Button>
  )
};

export default Timer;
