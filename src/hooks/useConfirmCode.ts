import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { confirmCode } from "@/api/confirmCode";
import { setUser } from "@/store/user";
import { useReset } from "@/store/auth";

export const useConfirmCode = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["confirm-code"],
    mutationFn: confirmCode,
    onSuccess: (data) => {
      setUser({
        id: data.user._id,
        phone: data.user.phone,
      });

      navigate(`/user/${data.user._id}`);
      useReset();
    },
    onError: (error: Error) => {
      alert(`${error.message}`);
    },
  });
};
