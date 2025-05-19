import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string(),
  address: z.string(),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(12, "Phone number must be 12 characters"),
})
.required();

export type RegisterSchema = z.infer<typeof registerSchema>;
