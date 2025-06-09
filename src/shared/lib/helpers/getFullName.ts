export const getFullName = (firstName: string, lastName: string, patronymic?: string) =>
    `${lastName.trim()} ${firstName.trim()} ${patronymic?.trim()}`;
