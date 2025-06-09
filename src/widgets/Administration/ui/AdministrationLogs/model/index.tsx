import { BaseChip } from '@/shared/ui';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

export const columns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Дата',
        width: 150,
        valueGetter: (_, row) => dayjs(row.createdAt).locale('ru').format('DD MMM YYYY'),
    },
    {
        field: 'time',
        headerName: 'Время',
        width: 80,
        valueGetter: (_, row) => dayjs(row.createdAt).format('HH:mm'),
    },
    { field: 'userId', headerName: 'ID Пользователя', width: 100 },
    { field: 'login', headerName: 'Пользователь', width: 200 },
    {
        field: 'message',
        headerName: 'Сообщение',
        flex: 1,
        minWidth: 250,
        renderCell: ({ value }) => <BaseChip label={value} color="info" />,
    },
    { field: 'body', headerName: 'Тело', flex: 1, minWidth: 1000 },
];

export const rows = [
    {
        id: 1,
        createdAt: '2024-10-11 11:37:45.699769+00',
        userId: 'b1781bad-1a40-4429-a5c6-23fa78c1b780',
        login: 'ЧертолинНикитаИгоревичРИ410940',
        message: 'User tried to edit table',
        // eslint-disable-next-line max-len
        body: '{"id":"b1781bad-1a40-4429-a5c6-23fa78c1b780","name":"test","description":"test","status":"active","createdBy":"b1781bad-1a40-4429-a5c6-23fa78c1b780","createdAt":"2024-10-11T11:37:45.699769+00:00","updatedAt":"2024-10-11T11:37:45.699769+00:00"}',
    },
    {
        id: 2,
        createdAt: '2025-05-13 20:25:45.699769+00',
        userId: '84c61a74-b0f6-49b3-ba60-e2c826995a5f',
        login: 'ЧертолинНикитаИгоревичРИ410940',
        message: 'User tried to edit table',
        // eslint-disable-next-line max-len
        body: '{"id":"b1781bad-1a40-4429-a5c6-23fa78c1b780","name":"test","description":"test","status":"active","createdBy":"b1781bad-1a40-4429-a5c6-23fa78c1b780","createdAt":"2024-10-11T11:37:45.699769+00:00","updatedAt":"2024-10-11T11:37:45.699769+00:00"}',
    },
];

export type LogsRequest = {
    page: number;
    size: number;

    query?: string;
};

type Log = {
    id: string;
    createdAt: string;
    userId: string;
    login: string;
    message: string;
    body: string;
};

export type LogsResponse = {
    logs: Log[];
    pagesCount: number;
};
