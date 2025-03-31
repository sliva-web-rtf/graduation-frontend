import { z } from 'zod';

export const createTopicFormSchema = z
    .object({
        name: z.string().min(1, 'Укажите название темы'),
        description: z.string().optional(),
        result: z.string().optional(),
        requestedRoles: z.union([z.string(), z.array(z.string()).min(1, 'Укажите роль')], {
            required_error: 'Укажите роль',
            invalid_type_error: 'Некорректный формат данных',
        }),
        // academicPrograms: z.array(z.string()).min(1, 'Укажите направление'),
        requiresСompany: z.boolean().optional(),
        companyName: z.string().optional(),
        requiresSupervisor: z.boolean().optional(),
        companySupervisorName: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.requiresСompany && !data.companyName) {
                return false;
            }

            return true;
        },
        {
            message: 'Укажите название предприятия',
            path: ['companyName'],
        },
    )
    .refine(
        (data) => {
            if (data.requiresSupervisor && !data.companySupervisorName) {
                return false;
            }

            return true;
        },
        {
            message: 'Укажите руководителя/куратора от предприятия',
            path: ['companySupervisorName'],
        },
    );

export type CreateTopicFormSchema = z.infer<typeof createTopicFormSchema>;
