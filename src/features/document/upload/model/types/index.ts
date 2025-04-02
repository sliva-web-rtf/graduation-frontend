import { z } from 'zod';

export const fileFormSchema = z.object({
    file: z
        .instanceof(File, { message: 'Прикрепите файл' })
        .refine((file) => file.size > 0, 'Файл не должен быть пустым')
        .refine((file) => file.size < 5 * 1024 * 1024, 'Файл должен быть меньше 5MB')
        .refine(
            (file) =>
                [
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                ].includes(file.type),
            'Допустимые форматы: .doc, .docx, .pdf',
        ),
});

export type FileFormSchema = z.infer<typeof fileFormSchema>;
