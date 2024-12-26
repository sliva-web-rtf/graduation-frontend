import { z } from 'zod';

export const changePasswordFormSchema = z
    .object({
        currentPassword: z
            .string()
            .min(8, { message: 'Минимум 8 символов' })
            .regex(/[a-z]/, { message: 'Пароль должен содержать хотя бы одну строчную букву' })
            .regex(/[A-Z]/, { message: 'Пароль должен содержать хотя бы одну заглавную букву' })
            .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' })
            .regex(/[\W_]/, { message: 'Пароль должен содержать хотя бы один специальный символ' }),
        repeatCurrentPassword: z
            .string()
            .min(8, { message: 'Минимум 8 символов' })
            .regex(/[a-z]/, { message: 'Пароль должен содержать хотя бы одну строчную букву' })
            .regex(/[A-Z]/, { message: 'Пароль должен содержать хотя бы одну заглавную букву' })
            .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' })
            .regex(/[\W_]/, { message: 'Пароль должен содержать хотя бы один специальный символ' }),
        newPassword: z
            .string()
            .min(8, { message: 'Минимум 8 символов' })
            .regex(/[a-z]/, { message: 'Пароль должен содержать хотя бы одну строчную букву' })
            .regex(/[A-Z]/, { message: 'Пароль должен содержать хотя бы одну заглавную букву' })
            .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' })
            .regex(/[\W_]/, { message: 'Пароль должен содержать хотя бы один специальный символ' }),
    })
    .refine((data) => data.currentPassword === data.repeatCurrentPassword, {
        message: 'Пароли не совпадают',
        path: ['repeatCurrentPassword'],
    });

export type ChangePasswordFormSchema = z.infer<typeof changePasswordFormSchema>;
