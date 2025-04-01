import { Role } from '@/entities/User';

export type PersonMainInfo = {
    id: string;
    name: string;
    role: Role;

    about?: string;
    contacts?: string;
    canJoin?: boolean;
};

export type Student = {
    direction: string;
    group: string;
    role: string;
};

export type Manager = {
    post: string;
    degree: string;
    limit: number;
    fullness: number;
};

export type Person = PersonMainInfo & Partial<Student> & Partial<Manager>;

type Entity = 'student' | 'professor';

export type PersonRequest = {
    id: string;
    entity: Entity;
};
