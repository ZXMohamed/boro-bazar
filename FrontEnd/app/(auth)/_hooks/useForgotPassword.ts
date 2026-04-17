import { useMutation } from "@tanstack/react-query";
import { ForgotFormType } from "../_schemas/forgotpassword.schema";
import { forgotPasswordAPI } from "../_services/forgot-password";
import { TForgotPasswordResponse } from "../_typs/forgot-password";

export const useForgotPassword = () => {
    return   useMutation({
        mutationFn: (credentials: ForgotFormType) => forgotPasswordAPI(credentials),
        onSuccess: (response: TForgotPasswordResponse) => {
            if (response.success) {
                
            }
            console.log(response);
        },
        onError: (error) => {
           
        },
    });
};
