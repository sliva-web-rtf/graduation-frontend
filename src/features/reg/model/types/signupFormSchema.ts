import { z } from 'zod';

export const signupFormSchema = z.object({
    email: z.string().min(1, { message: 'Почта обязательна' }).email({
        message: 'Невалидная почта',
    }),
    password: z
        .string()
        .min(8, { message: 'Минимум 8 символов' })
        .regex(/[a-z]/, { message: 'Пароль должен содержать хотя бы одну строчную букву' })
        .regex(/[A-Z]/, { message: 'Пароль должен содержать хотя бы одну заглавную букву' })
        .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' })
        .regex(/[\W_]/, { message: 'Пароль должен содержать хотя бы один специальный символ' }),
});

export type SignupFormSchema = z.infer<typeof signupFormSchema>;
