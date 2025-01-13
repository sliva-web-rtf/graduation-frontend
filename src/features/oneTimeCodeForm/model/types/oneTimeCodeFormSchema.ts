import { z } from 'zod';

export const oneTimeCodeFormSchema = z.object({
    code: z.number().max(6, { message: 'Код состоит максимум из 6 цифр' }),
});

export type OneTimeCodeFormSchema = z.infer<typeof oneTimeCodeFormSchema>;
