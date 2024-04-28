import { z } from 'zod';

export const newScientificWorkFormSchema = z.object({
    name: z.string().min(1, { message: 'Название обязательно' }),
    description: z.string().min(1, { message: 'Описание обязательно' }),
    result: z.string().min(1, { message: 'Проблема обязательна' }),
    scientificAreaSubsections: z
        .array(z.any(), { required_error: 'Укажите хотя бы одну область науки' })
        .min(1, { message: 'Укажите хотя бы одну область науки' }),
    scientificInterests: z
        .array(z.string(), { required_error: 'Укажите хотя бы одно ключевой слово' })
        .min(1, { message: 'Укажите хотя бы одно ключевой слово' }),
});

export type NewScientificWorkFormSchema = z.infer<typeof newScientificWorkFormSchema>;
