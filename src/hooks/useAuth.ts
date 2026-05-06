import { authApi } from "@/api/authApi"
import { setPhone } from "@/store/auth"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export const useGetCode = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (phone: string) => authApi.getCode(phone),
        onSuccess: (data, phone) => {
            setPhone(phone)
            navigate('/code')
        }
    })
}