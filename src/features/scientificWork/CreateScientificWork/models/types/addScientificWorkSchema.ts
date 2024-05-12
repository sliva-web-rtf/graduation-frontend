import { z } from 'zod';

export const addScientificWorkFormSchema = z.object({
    name: z.string().min(1, 'Название обязательно'),
    description: z.string().min(1, 'Описание обязательно'),
    result: z.string().min(1, 'Результаты обязательны'),
    scientificAreaSubsections: z
        .array(z.any(), {
            required_error: 'Укажите хотя бы одну область науки',
        })
        .min(1, 'Укажите хотя бы одну область науки'),
    scientificInterests: z
        .array(z.string(), {
            required_error: 'Укажите хотя бы одно ключевой слово',
        })
        .min(1, 'Укажите хотя бы одно ключевой слово'),
    limit: z
        .number({
            required_error: 'Укажите количество участников',
            invalid_type_error: 'Укажите количество участников',
        })
        .min(1, 'Укажите количество участников')
        .max(5, 'Максимум 5 участников'),
});

export type AddScientificWorkFormSchema = z.infer<typeof addScientificWorkFormSchema>;
