import { FormattingReviewerSchema } from '../model';

export const getFormattingReviewerDefaultValues = (
    id?: string | null,
    name?: string | null,
): FormattingReviewerSchema | undefined => {
    const formattingReviewerId = id ?? null;
    const formattingReviewerName = name ?? null;

    if (!formattingReviewerId || !formattingReviewerName) {
        return undefined;
    }

    return {
        formattingReviewer: {
            id: formattingReviewerId,
            name: formattingReviewerName,
        },
    };
};
