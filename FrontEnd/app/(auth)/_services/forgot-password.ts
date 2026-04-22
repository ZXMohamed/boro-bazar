import { api } from "../_lib/axios"
import { ForgotFormType } from "../_schemas/forgotpassword.schema"
import { TForgotPasswordResponse } from "../_typs/forgot-password"

export const forgotPasswordAPI = async (credentials: ForgotFormType): Promise<TForgotPasswordResponse> => {
    const response = await api.post<TForgotPasswordResponse>("/auth/forgot-password", credentials)
    return response.data
}