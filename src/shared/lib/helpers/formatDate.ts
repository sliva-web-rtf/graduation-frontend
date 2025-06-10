import dayjs from 'dayjs';

export const formatDate = (date?: Date, withTime = true) => {
    const format = withTime ? 'DD MMM YYYY HH:mm' : 'DD MMM YYYY';

    return date ? dayjs(date).locale('ru').format(format) : null;
};
