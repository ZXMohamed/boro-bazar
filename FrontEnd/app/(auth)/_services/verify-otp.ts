import { api } from "../_lib/axios";

export const verifyOtpAPI = async (data: { email: string; otp: string }) => {
    const response = await api.post("/auth/verify-otp", data);
    return response.data;
}
