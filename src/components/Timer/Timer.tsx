import { useTimer } from "@/hooks/useTimer";
import { useRequestCode } from "@/hooks/useRequestCode";
import { usePhone } from "@/store/auth";
import Button from "../ui/Button";
import styles from "./Timer.module.scss";

const Timer = () => {
  const { timerSeconds, isExpired } = useTimer();
  const phone = usePhone();

  const getCodeMutation = useRequestCode();
  const handleClick = () => {
    getCodeMutation.mutate(phone);
  };

  if (!isExpired) {
    return (
      <p className={`${styles.text} p-14`}>
        Запросить код повторно можно через <span>{timerSeconds}</span> секунд
      </p>
    );
  }

  return (
    <Button
      variant="secondary"
      className={`${styles.button}`}
      onClick={handleClick}
    >
      Запросить код ещё раз
    </Button>
  );
};

export default Timer;
