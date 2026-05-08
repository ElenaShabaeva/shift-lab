import { env } from "@/env";

type ConfirmCodePayload = {
  phone: string;
  code: string;
};

type ConfirmCodeResponse = {
  success: boolean;
  reason: string;
  user: {
    _id: string;
    phone: string;
  };
};

export const confirmCode = async ({
  phone,
  code,
}: ConfirmCodePayload): Promise<ConfirmCodeResponse> => {
  const clearPhone = phone.replace(/\D/g, "");

  const response = await fetch(`${env.API_URL}/users/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: clearPhone,
      code: code,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.reason || "Не удалось проверить код. Повторите позже");
  }

  return data;
};
