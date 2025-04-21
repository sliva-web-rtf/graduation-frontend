import dayjs from 'dayjs';

export function getPercentByDate(start: string | Date, end: string | Date): number {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const currentDate = dayjs();

    // Если текущая дата раньше начала → 0%
    if (currentDate.isBefore(startDate)) return 0;
    // Если текущая дата позже конца → 100%
    if (currentDate.isAfter(endDate)) return 100;

    // Общая продолжительность в миллисекундах
    const totalDuration = endDate.diff(startDate);
    // Пройденное время в миллисекундах
    const elapsedDuration = currentDate.diff(startDate);

    // Расчёт процента и округление
    const percentage = (elapsedDuration / totalDuration) * 100;
    return Math.round(percentage);
}
