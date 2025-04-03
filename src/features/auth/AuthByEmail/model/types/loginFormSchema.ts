import { z } from 'zod';

export const loginFormSchema = z.object({
    userName: z.string().min(1, { message: 'Введите логин' }),
    password: z.string().min(6, { message: 'Минимум 6 символов' }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
