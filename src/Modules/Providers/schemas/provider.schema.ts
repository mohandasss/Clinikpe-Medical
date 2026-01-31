import { z } from "zod";

export const providerFormSchema = z.object({
    fullName: z
        .string()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must be less than 100 characters"),
    specialization: z.string().min(1, "Specialization is required"),
    experience: z
        .string()
        .min(1, "Experience is required")
        .max(50, "Experience field is too long"),
    degree: z
        .string()
        .min(1, "Degree is required")
        .max(50, "Degree field is too long"),
    consultationFee: z
        .string()
        .refine(
            (val) => !isNaN(Number(val)) && Number(val) > 0,
            "Consultation fee must be a positive number"
        ),
});

export type ProviderFormType = z.infer<typeof providerFormSchema>;

export const inviteProviderSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export type InviteProviderType = z.infer<typeof inviteProviderSchema>;

export const availabilitySchema = z.object({
    dayOfWeek: z.enum([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]),
    startTime: z.string(),
    endTime: z.string(),
});

export type AvailabilityType = z.infer<typeof availabilitySchema>;
