const API_URL = "https://juniorsbootcamp.ru/api";

type GetCodeResponse = {
  success: boolean;
  reason: string;
  retryDelay: number;
};

type ValidCodeUserResponse = {
  _id: string;
  phone: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  city: string;
};

type ValidCodeResponse = {
  success: boolean;
  reason: string;
  user: ValidCodeUserResponse;
  token: string;
};

export const authApi = {
  getCode: async (phone: string): Promise<GetCodeResponse> => {
    const clearPhone = phone.replace(/\D/g, "");

    const response = await fetch(`${API_URL}/auth/otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: clearPhone }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.reason || "Failed to get code");
    }

    return data;
  },
  validCode: async (
    phone: string,
    code: string,
  ): Promise<ValidCodeResponse> => {
    const clearPhone = phone.replace(/\D/g, "");
    console.log('request');
    
    const response = await fetch(`${API_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: clearPhone,
        code: code,
      }),
    });

    const data = await response.json();
    console.log(data);
    

    if (!response.ok) {
      throw new Error(data.reason || "Failed to valid code");
    }

    return data;
  },
};
