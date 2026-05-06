import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { authApi } from "@/api/authApi"
import { setIsResend, setPhone, setTimerSeconds } from "@/store/auth"

export const useGetCode = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (phone: string) => authApi.getCode(phone),
        onSuccess: (data, phone) => {
            setPhone(phone)

            const seconds = Math.ceil(data.retryDelay / 1000);
            setTimerSeconds(seconds)
            setIsResend(false)

            navigate('/code')
        },
        onError: (error: Error) => {
            alert('Не удалось отправить код. Повторите позже')
        }
    })
}