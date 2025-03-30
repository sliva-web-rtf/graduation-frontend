import { PersonMainInfo } from '@/entities/Person/model/types';
import { Professor } from '@/entities/Professor';
import { Student } from '@/entities/Student';

export enum WorkStatus {
    NotConfirmed = 'NotConfirmed',
    Confirmed = 'Confirmed',
    Completed = 'Completed',
}

export interface Topic {
    id: string;
    name: string;
    description: string;
    isFavorite: boolean;
    canJoin: boolean;
    result: string;
    problem: string;
    limit: number;
    fullness: number;
    workStatus: WorkStatus;
    professor: Professor;
    students: Student[];
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
    name: string;
    description: string;
    isFavorite: boolean;
    canJoin: boolean;
    result: string;
    problem: string;
    limit: number;
    fullness: number;
    workStatus: WorkStatus;
    professor: Professor;
    studentDtos: Student[];
}
