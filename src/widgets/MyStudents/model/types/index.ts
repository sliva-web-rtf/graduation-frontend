import { StudentStatus } from '@/entities/Person';
import { TopicStatus } from '@/entities/Topic';
import { DocumentStatus, MovementStatus, ResultStatus } from '@/shared/lib/types/statuses';
import { GridSortModel } from '@mui/x-data-grid';
import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

export type StudentsTableRequest = {
    stage: string;
    page: number;
    size: number;

    query?: string;
    commissions?: string[];
    sort?: GridSortModel;
    studentStatuses?: string[];
    fromDate?: string;
    toDate?: string;
};

export type MyStudentsSchema = {
    stage: string;
    query: string;
    commissions: string[];
    selectedStudents: string[];

    fromDate: Dayjs | null;
    toDate: Dayjs | null;
};

export type DefenceData = {
    mark: number;
    result: ResultStatus;
    comment: string;
    isCommand: boolean;
    location?: string;
    date?: string;
    time?: string;
};

export type DocumentData = { name: string; status: DocumentStatus };
export type FormattingReviewData = {
    documents: DocumentData[];
};
// DTO
export type StudentRowDto = {
    id: string;
    fullName: string;
    academicGroup: string;
    commission?: {
        name: string;
        movementStatus: MovementStatus;
    };
    qualificationWork?: {
        id: string;
        status: TopicStatus;
        topic: string;

        companyName?: string;
        companySupervisorName?: string;
    };
    role: string;
    supervisor?: {
        id: string;
        fullName: string;
    };
    comment: string;
    status: StudentStatus;
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
    status: StudentStatus;
    commission?: {
        movementStatus: MovementStatus;

        prev?: string;
        prevSecretary?: string;
        current?: string;
        currentSecretary?: string;
    };
    topic?: {
        id?: string;
        name?: string;
    };
    role?: string;
    topicStatus?: TopicStatus;
    companyName?: string;
    companySupervisorName?: string;

    supervisor?: {
        id: string;
        fullName: string;
    };
    comment?: string;
    data: DefenceData | FormattingReviewData;
};

export type StudentsTableModel = {
    students: StudentRowModel[];
    pagesCount: number;
    dataType: DataType;
};

export const setDefenceFormSchema = z.object({
    date: z.coerce
        .date({
            errorMap: () => ({
                message: 'Введите дату',
            }),
        })
        .min(dayjs().hour(0).minute(0).day(-1).toDate(), {
            message: 'Дата не может быть в прошлом',
        })
        .max(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), {
            message: 'Дата не может быть больше чем через год от текущей',
        }),
    location: z.string(),
});

export type SetDefenceFormSchema = z.infer<typeof setDefenceFormSchema>;
export type SetDefenceRequest = {
    stage: string;
    studentIds: string[];
    date: string;
    location: string;
};

export type EditStudentRowDto = {
    studentId: string;
    stage: string;

    studentStatus?: StudentStatus;
    qualificationWorkStatus?: TopicStatus;
    documents?: DocumentData[];
    location?: string;
    studentComment?: string;
    supervisorId?: string;
    result?: string;
    role?: string;
    companyName?: string;
    companySupervisorName?: string;
    mark?: number;
    comment?: string;
    isCommand?: boolean;
    date?: string;
    time?: string;
    topic?: string;
};
