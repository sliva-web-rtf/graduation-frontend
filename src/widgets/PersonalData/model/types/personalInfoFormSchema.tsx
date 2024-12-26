import { z } from 'zod';
import { ErrorMessage } from '@/shared/lib/helpers/errorMessages';

export const personalInfoFormSchema = z.object({
    firstName: z.string().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    lastName: z.string().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    patronymic: z.string().min(1, { message: ErrorMessage.getRequiredErrorFieldMessage() }),
    email: z
        .string()
        .min(1, { message: 'Почта обязательна' })
        .email({ message: 'Невалидная почта' })
        .refine(
            (email) => {
                const allowedDomains = [
                    'gmail.com',
                    'yahoo.com',
                    'hotmail.com',
                    'outlook.com',
                    'aol.com',
                    'icloud.com',
                    'mail.ru',
                    'yandex.ru',
                    'urfu.ru',
                    'urfu.me',
                ];
                const domain = email.split('@')[1];
                return allowedDomains.includes(domain);
            },
            { message: 'Невалидная почта' },
        ),
    phone: z
        .optional(
            z
                .string()
                .min(11, { message: ErrorMessage.getPhoneErrorFieldMessage() })
                .max(11, { message: ErrorMessage.getPhoneErrorFieldMessage() })
                .refine((value) => !Number.isNaN(Number(value)), ErrorMessage.getPhoneErrorFieldMessage()),
        )
        .optional()
        .or(z.literal('')),
    contacts: z.string(),
    lastPasswordChangedDate: z.date(),
});

export type PersonalInfoFormSchema = z.infer<typeof personalInfoFormSchema>;
