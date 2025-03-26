type User = {
    firstName: string;
    lastName: string;

    patronymic?: string;
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

export type Person = User & Partial<Student> & Partial<Manager>;

type Entity = 'student' | 'professor';

export type PersonRequest = {
    id: string;
    entity: Entity;
};
