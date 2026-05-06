import { z } from "zod";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email({ message: "please Enter Valid email" }),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(passwordRegex, {
      message:
        "Password must contain uppercase, lowercase, number, and special character",
    }),
});

export type RegisterFormType = z.infer<typeof registerSchema>;
