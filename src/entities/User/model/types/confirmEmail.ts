export type ConfirmEmail = { userId: string; confirmCode: string; role: string };
export type RepeatConfirmEmailStudent = {
    studentId?: string;
    email: string;
};
export type RepeatConfirmEmailProfessor = {
    professorId?: string;
    email: string;
};
