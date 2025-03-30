export enum Role {
    Admin = 'SytemAdmin',
    Student = 'Student',
    Supervisor = 'Professor',
    Expert = 'Expert',
    Clerk = 'Clerk',
    HeadClerk = 'HeadClerk',
}

export const ROLES: Record<Role, string> = {
    [Role.Student]: 'Студент',
    [Role.Supervisor]: 'Руководитель ВКР',
    [Role.Expert]: 'Экперт',
    [Role.Clerk]: 'Секретарь',
    [Role.HeadClerk]: 'Гл. секретарь',
    [Role.Admin]: 'Администратор',
};
