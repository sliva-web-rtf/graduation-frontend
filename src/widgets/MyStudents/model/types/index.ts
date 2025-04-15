import { z } from 'zod';

export type StudentsTableRequest = {
    stage: string;
    page: number;
    size: number;

    query?: string;
};

export type MyStudentsSchema = {
    stage: string;
    query: string;
};

export type DefenceData = {
    mark: number;
    result: string;
    comment: string;
    isCommand: boolean;
};

export type DocumentData = { name: string; status: string };
export type FormattingReviewData = {
    documents: DocumentData[];
};
// DTO
export type StudentRowDto = {
    id: string;
    fullName: string;
    academicGroup: string;
    qualificationWork?: {
        id: string;
        status: string;
        topic: string;

        companyName?: string;
        companySupervisorName?: string;
    };
    role: string;
    supervisor?: {
        id: string;
        fullName: string;
    };
    status: string;
    data: DefenceData | FormattingReviewData;
};

export enum DataType {
    Defence = 'Defence',
    PreDefence = 'PreDefence',
    FormattingReview = 'FormattingReview',
}

export type StudentsTableDto = {
    students: StudentRowDto[];
    pagesCount: number;
    dataType: DataType;
};

// MODEL

export type StudentRowModel = {
    id: string;
    number: number;
    student: {
        id: string;
        fullName: string;
    };
    academicGroup: string;
    role: string;

    topic?: {
        id?: string;
        name?: string;
    };
    topicStatus?: string;
    companyName?: string;
    companySupervisorName?: string;

    supervisor?: {
        id: string;
        fullName: string;
    };
    status: string;
    data: DefenceData | FormattingReviewData;
};

export type StudentsTableModel = {
    students: StudentRowModel[];
    pagesCount: number;
    dataType: DataType;
};

export const setDefenceFormSchema = z.object({
    date: z.coerce.date({
        errorMap: () => ({
            message: 'Введите дату',
        }),
    }),
});

export type SetDefenceFormSchema = z.infer<typeof setDefenceFormSchema>;
