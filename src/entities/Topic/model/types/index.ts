import { PersonMainInfo } from '@/entities/Person/model/types';
import { StrictRecord } from '@/shared/lib/types/StrictRecord';

export enum TopicStatus {
    Cancelled = 'Cancelled',
    Consideration = 'Consideration',
    Approved = 'Approved',
}

export const TopicStatusRus: StrictRecord<TopicStatus, string> = {
    [TopicStatus.Cancelled]: 'Отклонена',
    [TopicStatus.Consideration]: 'На рассмотрении',
    [TopicStatus.Approved]: 'Утверждена',

    getUnknown: 'Неизвестно',
};

export interface Topic {
    id: string;
    name: string;
    description: string;
    result: string;
    requestedRole: string;
    supervisor: PersonMainInfo;
    student: PersonMainInfo;
    owner: PersonMainInfo;
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
