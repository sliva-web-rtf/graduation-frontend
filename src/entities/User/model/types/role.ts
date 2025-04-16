export enum Role {
    Admin = 'Admin',
    Student = 'Student',
    Supervisor = 'Supervisor',
    Expert = 'Expert',
    Secretary = 'Secretary',
    HeadSecretary = 'HeadSecretary',
}

export const ROLES: Record<Role, string> = {
    [Role.Student]: 'Студент',
    [Role.Supervisor]: 'Руководитель',
    [Role.Expert]: 'Экперт',
    [Role.Secretary]: 'Секретарь',
    [Role.HeadSecretary]: 'Гл. секретарь',
    [Role.Admin]: 'Администратор',
};
