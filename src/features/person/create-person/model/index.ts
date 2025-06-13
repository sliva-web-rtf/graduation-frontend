import { Role } from '@/entities/User';
import { z } from 'zod';

export const createPersonFormSchema = z.object({
    firstName: z.string().min(1, { message: 'Введите имя' }),
    lastName: z.string().min(1, { message: 'Введите фамилию' }),
    patronymic: z.string().optional(),
    roles: z.array(z.nativeEnum(Role), { required_error: 'Выберите роль' }).min(1, { message: 'Выберите роль' }),
    password: z.string().min(1, { message: 'Введите пароль для пользователя' }),

    academicGroup: z.object({ label: z.string(), value: z.string() }).optional(),
    supervisorLimits: z
        .number({ required_error: 'Введите лимиты дипломников', invalid_type_error: 'Введите лимиты дипломников' })
        .min(1, { message: 'Лимиты дипломников должны быть больше 0' })
        .optional(),
});

export type CreatePersonFormSchema = z.infer<typeof createPersonFormSchema>;
