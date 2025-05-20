export type FormattingReviewerDto = {
    id: string;
    name: string;
};

export type FormattingReviewerModel = {
    id: FormattingReviewerDto['id'];
    name: FormattingReviewerDto['name'];
};

export type FormattingReviewersDto = {
    formattingReviewers: FormattingReviewerDto[];
    pagesCount: number;
};

export type FormattingReviewersModel = FormattingReviewersDto['formattingReviewers'];

export type FormattingReviewersRequest = {
    page?: number;
    size?: number;
    query?: string;
};
