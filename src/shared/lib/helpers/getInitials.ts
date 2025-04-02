export function getInitials(fullName: string): string;
// eslint-disable-next-line no-redeclare
export function getInitials(
    firstName: string | null | undefined,
    lastName: string | null | undefined,
    patronymic?: string | null,
): string;

// eslint-disable-next-line no-redeclare
export function getInitials(
    firstOrFullName: string | null | undefined,
    lastName?: string | null,
    patronymic?: string | null,
): string {
    if (lastName) {
        // Обработка случая, когда переданы отдельные параметры
        if (!firstOrFullName || !lastName) {
            return 'Неизвестно';
        }
        const initials = `${lastName} ${firstOrFullName[0]}.`;
        return patronymic ? `${initials} ${patronymic[0]}.` : initials;
    }

    // Обработка строки fullname
    if (!firstOrFullName) {
        return 'Неизвестно';
    }

    const parts = firstOrFullName.trim().split(/\s+/);
    if (parts.length < 2) {
        return firstOrFullName; // Если указано только одно слово, просто вернуть его
    }

    const [last, first, patron] = parts;
    const initials = `${last} ${first[0]}.`;
    return patron ? `${initials} ${patron[0]}.` : initials;
}
