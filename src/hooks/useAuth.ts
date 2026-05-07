import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/authApi";
import { setIsResend, setPhone, setTimerSeconds } from "@/store/auth";
import { setUserID, setUserPhone } from "@/store/user";

export const useGetCode = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (phone: string) => authApi.getCode(phone),
    onSuccess: (data, phone) => {
      setPhone(phone);

      const seconds = Math.ceil(data.retryDelay / 1000);
      setTimerSeconds(seconds);
      setIsResend(false);

      navigate("/code");
    },
    onError: (error: Error) => {
      alert(`${error.message}`);
    },
  });
};

export const useValidCode = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ phone, code }: { phone: string; code: string }) => 
      authApi.validCode(phone, code),
    onSuccess: (data) => {
      localStorage.removeItem('auth-storage')
      setUserID(data.user._id);
      setUserPhone(data.user.phone)
      navigate(`/user/${data.user._id}`)
    },
    onError: (error: Error) => {
      alert(`${error.message}`);
    },
  });
};
