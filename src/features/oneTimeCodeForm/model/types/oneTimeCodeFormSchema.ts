import { z } from 'zod';

export const oneTimeCodeFormSchema = z.object({
    code: z.string().min(6, { message: 'Код состоит из 6 цифр' }),
});

export type OneTimeCodeFormSchema = z.infer<typeof oneTimeCodeFormSchema>;
