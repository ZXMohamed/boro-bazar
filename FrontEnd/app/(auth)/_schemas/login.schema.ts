import { z } from "zod";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const logInSchema = z.object({
   email: z.email({ message: "please Enter Valid email" }),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(passwordRegex, {
      message:
        "Password must contain uppercase, lowercase, number, and special character",
    }),
});

export type LogInFormType = z.infer<typeof logInSchema>;