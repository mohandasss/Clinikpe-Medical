import { z } from "zod";

export const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export type PhoneFormValues = z.infer<typeof phoneSchema>;
export type OTPFormValues = z.infer<typeof otpSchema>;
