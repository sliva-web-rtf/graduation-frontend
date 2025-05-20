import dayjs, { Dayjs } from 'dayjs';

export const buildDateRange = (fromDate: Dayjs | null, toDate: Dayjs | null) => {
    return {
        fromDate: fromDate ? dayjs(fromDate).format('YYYY.MM.DD') : undefined,
        toDate: toDate ? dayjs(toDate).format('YYYY.MM.DD') : undefined,
    };
};
