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
