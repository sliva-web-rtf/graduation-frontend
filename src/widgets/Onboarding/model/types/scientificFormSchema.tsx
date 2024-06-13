import { z } from 'zod';
import { ErrorMessage } from '@/shared/lib/helpers/errorMessages';

export const scientificFormSchema = z.object({
    educationLevel: z.string().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    course: z.number().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    scienceArea: z
        .array(
            z.object({
                section: z.string(),
                label: z.string(),
            }),
        )
        .min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    scienceInterests: z.string().array().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    about: z
        .optional(z.string().max(1000, { message: ErrorMessage.getMaxErrorFieldMessage(1000) }))
        .optional()
        .or(z.literal('')),
});

export type ScientificFormSchema = z.infer<typeof scientificFormSchema>;
