import { z } from 'zod';

export const createTopicFormSchema = z
    .object({
        name: z.string().min(1, 'Укажите название темы'),
        role: z.string({ required_error: 'Укажите роль' }),
        description: z.string().optional(),
        result: z.string().optional(),
        isEnterpriseTopic: z.boolean().optional(),
        enterprise: z.string().optional(),
        isEnterpriseManager: z.boolean().optional(),
        enterpriseManager: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.isEnterpriseTopic && !data.enterprise) {
                return false;
            }

            return true;
        },
        {
            message: 'Укажите название предприятия',
            path: ['enterprise'],
        },
    )
    .refine(
        (data) => {
            if (data.isEnterpriseManager && !data.enterpriseManager) {
                return false;
            }

            return true;
        },
        {
            message: 'Укажите руководителя/куратора от предприятия',
            path: ['enterpriseManager'],
        },
    );

export type CreateTopicFormSchema = z.infer<typeof createTopicFormSchema>;
