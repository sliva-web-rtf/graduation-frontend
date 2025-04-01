import { PersonMainInfo } from '@/entities/Person/model/types';

export enum WorkStatus {
    NotConfirmed = 'NotConfirmed',
    Confirmed = 'Confirmed',
    Completed = 'Completed',
}

export interface Topic {
    id: string;
    name: string;
    description: string;
    result: string;
    requestedRole: string;
    supervisor: PersonMainInfo;
    student: PersonMainInfo;
    owner: PersonMainInfo;
    // workStatus: WorkStatus;
}

export type TopicCardModel = {
    id: string;
    name: string;
    description: string;
    owner: PersonMainInfo;
    academicPrograms: string[];
};

export interface UsersScientificWorksRequest {
    userId: string;
}

export const WorkStatusRus: Record<WorkStatus, string> = {
    [WorkStatus.NotConfirmed]: 'Не подтверждена',
    [WorkStatus.Confirmed]: 'Одобрена',
    [WorkStatus.Completed]: 'Подтверждена',
};

export interface ScientificWorksRequest {
    id: string;
}

export interface ScientificWorkDto {
    id: string;
    topic: string;
    description: string;
    result: string;
    requestedRole: string;
    supervisor: PersonMainInfo;
    owner: PersonMainInfo;
    student: PersonMainInfo;
}
