import { api } from "../_lib/axios";
import { RegisterFormType } from "../_schemas/register.schema";

export const registerAPI = async (data: RegisterFormType) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
}
