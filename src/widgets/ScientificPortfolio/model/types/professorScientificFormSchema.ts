import { z } from 'zod';
import { ErrorMessage } from '@/shared/lib/helpers/errorMessages';

export const professorScientificFormSchema = z.object({
    degree: z.string().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    urfuResearchPortal: z.string().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    scopusUri: z.string().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    riscUri: z.string().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    workExperienceYears: z.number().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
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

export type ProfessorScientificFormSchema = z.infer<typeof professorScientificFormSchema>;
