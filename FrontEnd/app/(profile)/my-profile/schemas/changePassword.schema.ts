import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Old password must be at least 6 characters"),

    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from old password",
    path: ["newPassword"],
  });

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
