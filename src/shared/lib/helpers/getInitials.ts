export const getInitials = (
    firstName: string | null | undefined,
    lastName: string | null | undefined,
    patronymic?: string | null,
) => {
    if (!firstName || !lastName) {
        return 'Неизвестно';
    }
    const initials = `${lastName} ${firstName[0]}. `;
    return patronymic ? `${initials}${patronymic[0]}.` : initials;
};
