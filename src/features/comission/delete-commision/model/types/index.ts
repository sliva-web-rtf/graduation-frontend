import { z } from 'zod';

export const createDeleteCommissionSchema = (commissionName: string) =>
    z.object({
        confirmation: z
            .string()
            .min(1, { message: `Введите <${commissionName}> для подтверждения` })
            .refine(
                (value) => {
                    const lowerValue = value.trim().toLowerCase().replaceAll('<', '').replaceAll('>', '');
                    const lowerCommissionName = commissionName
                        .trim()
                        .toLowerCase()
                        .replaceAll('<', '')
                        .replaceAll('>', '');

                    return lowerValue === lowerCommissionName;
                },
                {
                    message: `Текст не совпадает с <${commissionName}>`,
                },
            ),
    });

export type DeleteCommissionSchema = z.infer<ReturnType<typeof createDeleteCommissionSchema>>;
