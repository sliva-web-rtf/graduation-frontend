import { z } from 'zod';

export const formattingReviewerSchema = z.object({
    formattingReviewer: z.object(
        {
            id: z.string(),
            name: z.string(),
        },
        { required_error: 'Выберите нормоконтролера', invalid_type_error: 'Выберите нормоконтролера' },
    ),
});

export type FormattingReviewerSchema = z.infer<typeof formattingReviewerSchema>;

export type SetFormattingReviewerRequest = {
    academicGroupId: string;
    formattingReviewerId: string;
};

export type SetFormattingReviewerResponse = {
    academicGroupId: string;
};
