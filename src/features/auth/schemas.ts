import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email().trim().min(1, "Email is required"),
    password: z.string().min(8, "Minimum of 8 characters").max(20)
});

export const registerSchema = z.object({
    name: z.string().trim().min(2, "Minimum of 2 characters required").max(100),
    email: z.string().email().trim().min(1, "Email is required"),
    password: z.string().min(8, "Minimum of 8 characters required").max(20)
});