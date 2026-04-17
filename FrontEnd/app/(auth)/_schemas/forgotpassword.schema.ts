import z from "zod";

export const forgotSchema = z.object({
    email: z.email({ message: "please Enter Valid email" }),
});
export type ForgotFormType = z.infer<typeof forgotSchema>;