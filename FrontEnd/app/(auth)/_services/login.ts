import { api } from "../_lib/axios";
import { LogInFormType } from "../_schemas/login.schema";
import { LoginResponse } from "../_typs/login";

export const loginAPI = async (credentials: LogInFormType): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data;
}