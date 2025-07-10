import { z } from "zod"

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  phoneNumber: z.string().length(13, { message: 'Invalid phone number' }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .regex(/[A-Z]/, { message: "Password Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password Must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password Must contain at least one symbol" }),
})