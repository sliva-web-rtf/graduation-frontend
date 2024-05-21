export const getInitials = (
    firstName: string | null,
    lastName: string | null,
    patronymic: string | null | undefined,
) => {
    if (!firstName || !lastName) {
        return 'Неизвестно';
    }
    const initials = `${lastName} ${firstName[0]}`;
    return patronymic ? `${initials}.${patronymic[0]}.` : initials;
};
