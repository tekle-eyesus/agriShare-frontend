import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100),
  remember: z.boolean().optional(),
});

const baseSignup = {
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  phone: z
    .string()
    .trim()
    .min(7, "Phone is required")
    .max(20)
    .regex(/^\+?[0-9\s-]+$/, "Invalid phone number"),
  email: z.string().trim().email("Invalid email").max(255),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100)
    .regex(/[A-Za-z]/, "Must contain a letter")
    .regex(/[0-9]/, "Must contain a number"),
};

export const investorSignupSchema = z.object({
  ...baseSignup,
  role: z.literal("investor"),
});

export const farmerSignupSchema = z.object({
  ...baseSignup,
  role: z.literal("farmer"),
  region: z.string().trim().min(1, "Region is required").max(100),
  zone: z.string().trim().min(1, "Zone is required").max(100),
  woreda: z.string().trim().min(1, "Woreda is required").max(100),
  kebele: z.string().trim().min(1, "Kebele is required").max(100),
  bio: z.string().trim().min(10, "Tell us a bit more (min 10 chars)").max(500),
});

export const signupSchema = z.discriminatedUnion("role", [
  investorSignupSchema,
  farmerSignupSchema,
]);
