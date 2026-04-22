import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../_services/login";
import { LogInFormType } from "../_schemas/login.schema";

export const useLogin = () => {
    return useMutation({
        mutationFn: (credentials: LogInFormType) => loginAPI(credentials),
        onSuccess: (response) => {
            console.log(response)
           
        },
        onError: (error) => {
            console.log(error);
             
        },
    });
};
