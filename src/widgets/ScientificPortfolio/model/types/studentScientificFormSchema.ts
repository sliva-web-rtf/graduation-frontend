import { z } from 'zod';
import { ErrorMessage } from '@/shared/lib/helpers/errorMessages';

export const studentScientificFormSchema = z.object({
    degree: z.string().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    year: z.number().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    scientificArea: z
        .array(
            z.object({
                section: z.string(),
                label: z.string(),
            }),
        )
        .min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    scientificInterests: z.string().array().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    about: z
        .optional(z.string().max(1000, { message: ErrorMessage.getMaxErrorFieldMessage(1000) }))
        .optional()
        .or(z.literal('')),
});

export type StudentScientificFormSchema = z.infer<typeof studentScientificFormSchema>;
