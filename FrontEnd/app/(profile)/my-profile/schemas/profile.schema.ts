import { z } from "zod";

export const profilSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),

  email: z.string().min(1, "Email is required").email("Invalid email address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+\d{8,15}$/, "Invalid phone number"),
});
