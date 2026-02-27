import { z } from "zod";
import { TourCategory, TourStatus } from "@/features/tours/types";

const TourStepSchema = z.object({
    title: z.string().min(1, "Step title is required"),
    description: z.string().optional(),
    time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    images: z.array(z.string()).optional(),
});

export const CreateTourSchema = z.object({
    name: z.string().min(5, "Name must be at least 5 characters"),
    description: z.string().min(10, "Description is too short"),
    category: z.nativeEnum(TourCategory, {
        message: "Please select a valid category",
    }),
    durationHours: z.coerce.number().min(1, "Duration must be at least 1 hour"),
    meetingPoint: z.string().optional(),
    status: z.nativeEnum(TourStatus).default(TourStatus.DRAFT),
    basePrice: z.coerce.number().min(0, "Price cannot be negative"),
    currency: z.string().default("USD"),
    isFree: z.boolean().default(false),
    pickupAvailable: z.boolean().default(false),
    wheelchairAccessible: z.boolean().default(false),
    inclusions: z.array(z.string()).default([]),
    exclusions: z.array(z.string()).default([]),
    itinerary: z.array(TourStepSchema).default([]),
    images: z.array(z.string()).default([]),
});

export type CreateTourFormValues = z.infer<typeof CreateTourSchema>;