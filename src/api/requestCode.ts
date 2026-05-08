import { env } from "@/env";

type RequestCodeResponse = {
  success: boolean;
  reason: string;
  retryDelay: number;
};

export const requestCode = async (
  phone: string,
): Promise<RequestCodeResponse> => {
  const clearPhone = phone.replace(/\D/g, "");

  const response = await fetch(`${env.API_URL}/auth/otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: clearPhone }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.reason || "Не удалось отправить код. Повторите позже");
  }

  return data;
};
