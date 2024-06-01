import { date, datetimeRegex, z } from "zod"

export const EventFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
    location: z.string().min(3, 'Location must be at least 3 characters').max(400, 'Location must be less than 400 characters'),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    styleId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url(),
    // startTime: z.string(),
    // endTime: z.date(),
})

export const StyleForm = z.object({
    style: z
        .string()
        .min(5, { message: 'Style must be at least 5 characters.' })
        .max(30, {
            message: "Stle must not be longer than 30 characters.",
        }),
    descriptionStyle: z
        .string()
        .min(10, {
            message: "Bio must be at least 10 characters.",
        })
        .max(160, {
            message: "Bio must not be longer than 30 characters.",
        }),
});