import { Role } from '@/entities/User';
import { StrictRecord } from '@/shared/lib/types/StrictRecord';

export type PersonMainInfo = {
    id: string;
    fullName: string;

    about?: string;
    contacts?: string;
    canJoin?: boolean;
};

export type Student = {
    academicProgram: string;
    academicGroup: string;
    role: string;

    qualificationWorkId?: string;
};

export type Supervisor = {
    limit: number;
    fullness: number;
};

export type Person = PersonMainInfo & Partial<Student> & Partial<Supervisor>;

export type PersonRequest = {
    id: string;
    isStudent: boolean;
};

export enum StudentStatus {
    Kicked = 'Kicked',
    Academ = 'Academ',
    Active = 'Active',
    Transferred = 'Transferred',
}

export const StudentStatusRus: StrictRecord<StudentStatus, string> = {
    [StudentStatus.Kicked]: 'Отчислен',
    [StudentStatus.Academ]: 'Отпуск академический',
    [StudentStatus.Active]: 'Активен',
    [StudentStatus.Transferred]: 'Переведен',

    getUnknown: 'Нет данных',
} as const;

export type CreatePersonRequest = {
    firstName: string;
    lastName: string;
    roles: Role[];
    password: string;
    year: string;

    supervisorLimits?: number;
    patronymic?: string;
    academicGroupId?: string;
};
