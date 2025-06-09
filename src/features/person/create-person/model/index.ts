import { Role } from '@/entities/User';
import { z } from 'zod';

export const createPersonFormSchema = z.object({
    firstName: z.string().min(1, { message: 'Введите имя' }),
    lastName: z.string().min(1, { message: 'Введите фамилию' }),
    patronymic: z.string().optional(),
    role: z.array(z.nativeEnum(Role), { required_error: 'Выберите роль' }).min(1, { message: 'Выберите роль' }),
    academicGroup: z.string().optional(),
});

export type CreatePersonFormSchema = z.infer<typeof createPersonFormSchema>;
