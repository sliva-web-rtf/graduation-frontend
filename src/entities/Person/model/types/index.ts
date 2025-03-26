type User = {
    firstName: string;
    lastName: string;

    patronymic?: string;
    about?: string;
    contacts?: string;
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
