import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { requestCode } from "@/api/requestCode";
import { setPhone, setTimerSeconds } from "@/store/auth";

export const useRequestCode = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["request-code"],
    mutationFn: requestCode,
    onSuccess: (data, phone) => {
      setPhone(phone);

      const seconds = Math.ceil(data.retryDelay / 1000);
      setTimerSeconds(seconds);

      navigate("/code");
    },
    onError: (error: Error) => {
      alert(`${error.message}`);
    },
  });
};
