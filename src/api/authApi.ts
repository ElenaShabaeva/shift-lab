const API_URL = "https://juniorsbootcamp.ru/api";

type GetCodeResponse = {
  success: boolean,
  reason: string,
  retryDelay: number
}

export const authApi = {
  getCode: async (phone: string): Promise<GetCodeResponse> => {
    const clearPhone = phone.replace(/\D/g, "");
    
    const response = await fetch(`${API_URL}/auth/otp`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: clearPhone }),
    });

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Failed to get code");
    }

    return data;
  },
};
