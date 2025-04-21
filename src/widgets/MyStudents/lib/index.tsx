import { RoutePath } from '@/app/providers/Router';
import { StudentStatus, StudentStatusRus } from '@/entities/Person';
import { TopicStatus, TopicStatusRus } from '@/entities/Topic';
import { DocumentStatus, DocumentStatusRus, ResultStatus, ResultStatusRus } from '@/shared/lib/types/statuses';
import { GridColDef, GridColTypeDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { DataType, DefenceData, FormattingReviewData } from '../model';
import {
    rendeIsCommandCell,
    renderCommentCell,
    renderDocCell,
    RenderEditTextareaCell,
    RenderEditTimeCell,
    renderLinkCell,
    renderResultCell,
    RenderRoleEditCell,
    renderStudentStatusCell,
    RenderSupervisorEditCell,
    renderTopicStatusCell,
} from './renderCells';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

type RowData = { data: DefenceData & FormattingReviewData };

const multilineColumn: GridColTypeDef = {
    type: 'string',
    renderEditCell: (params) => <RenderEditTextareaCell {...params} />,
};

const DOCUMENTS = [
    'Заявление',
    'Задание',
    'Пояснительная записка',
    'Справка о наличии заимствовании',
    'Акт о внедрении',
] as const;
const formattingReviewColumns: GridColDef[] = DOCUMENTS.map((doc, index) => ({
    headerName: doc,
    field: `documents[${index}]`,
    type: 'singleSelect',
    valueGetter: (_, row: RowData) => {
        const document = row.data?.documents[index];

        return { name: doc, status: document?.status ?? DocumentStatus.Empty };
    },
    valueOptions: Object.entries(DocumentStatusRus).map(([key, value]) => ({ value: key, label: value })),
    valueSetter: (newStatus, row) => {
        const documents = row.data?.documents;
        const document = {
            name: doc,
            status: newStatus,
        };

        return {
            ...row,
            data: {
                ...row.data,
                documents: [...documents.slice(0, index), document, ...documents.slice(index + 1)],
            },
        };
    },
    width: 100,
    renderCell: renderDocCell,
    editable: true,
}));

const baseColumns: GridColDef[] = [
    { field: 'number', headerName: '№', width: 50, align: 'center' },
    {
        field: 'student',
        headerName: 'ФИО',
        width: 300,
        renderCell: renderLinkCell(RoutePath.Students, 'fullName'),
        display: 'flex',
    },
    { field: 'academicGroup', headerName: 'Группа', width: 110 },
    {
        field: 'topic',
        type: 'string',
        headerName: 'Тема',
        valueSetter: (value, row) => ({
            ...row,
            topic: {
                ...row.topic,
                name: value.name ?? value,
            },
        }),
        renderCell: renderLinkCell(RoutePath.Topics, 'name'),
        renderEditCell: (params) => <RenderEditTextareaCell {...params} value={params.value?.name ?? ''} />,
        display: 'flex',
        width: 400,
        editable: true,
    },
    {
        headerName: 'Статус темы',
        field: 'topicStatus',
        type: 'singleSelect',
        valueOptions: Object.values(TopicStatus).map((status) => ({
            value: status,
            label: TopicStatusRus[status],
        })),
        width: 180,
        renderCell: renderTopicStatusCell,
        editable: true,
    },
    {
        field: 'role',
        headerName: 'Роль',
        renderEditCell: (params) => <RenderRoleEditCell {...params} />,
        valueSetter: (value, row) => ({
            ...row,
            role: value ?? row.role,
        }),
        width: 250,
        sortable: false,
        editable: true,
    },
    {
        field: 'supervisor',
        headerName: 'Руководитель',
        valueSetter: (value, row) => ({
            ...row,
            supervisor: value
                ? {
                      fullName: value.label ?? value.fullName,
                      id: value.value ?? value.id,
                  }
                : null,
        }),
        renderCell: renderLinkCell(RoutePath.Supervisors, 'fullName'),
        renderEditCell: (params) => (
            <RenderSupervisorEditCell
                {...params}
                value={params.value ? { label: params.value?.fullName, value: params.value?.id } : null}
            />
        ),
        display: 'flex',
        width: 300,
        editable: true,
    },
    { field: 'companyName', headerName: 'Предприятие', width: 300, sortable: false, editable: true },
    {
        field: 'companySupervisorName',
        headerName: 'Куратор от предприятия',
        width: 300,
        editable: true,
    },
    {
        headerName: 'Статус студента',
        field: 'status',
        type: 'singleSelect',
        valueOptions: Object.values(StudentStatus).map((status) => ({
            value: status,
            label: StudentStatusRus[status],
        })),
        width: 150,
        renderCell: renderStudentStatusCell,
        editable: true,
    },
    {
        headerName: 'Комментарий',
        field: 'comment',
        renderCell: renderCommentCell,
        width: 500,
        editable: true,
        ...multilineColumn,
    },
];
const defenceColumns: GridColDef[] = [
    {
        headerName: 'Дата предзащиты',
        field: 'date',
        type: 'date',
        valueGetter: (_, row: RowData) => {
            const { date } = row.data;

            if (!date) {
                return null;
            }

            return dayjs(date).toDate();
        },
        valueSetter: (value, row) => ({
            ...row,
            data: {
                ...row.data,
                date: value ? dayjs(value).format('YYYY-MM-DD') : null,
            },
        }),
        width: 120,
        editable: true,
    },
    {
        display: 'flex',
        headerName: 'Время предзащиты',
        field: 'time',
        type: 'dateTime',
        width: 90,
        editable: true,
        valueGetter: (_, row: RowData) => {
            const { time, date } = row.data;
            if (!time) return null;

            const datetime = dayjs(date ?? undefined);
            const [hours, minutes] = time.split(':').map(Number);

            return datetime.hour(hours).minute(minutes);
        },
        valueSetter: (value, row) => ({
            ...row,
            data: {
                ...row.data,
                time: value?.format('HH:mm:ss') || null,
            },
        }),
        valueFormatter: (value: Date) => {
            return value ? dayjs(value).format('HH:mm') : null;
        },
        renderEditCell: (params) => <RenderEditTimeCell {...params} />,
    },
    {
        headerName: 'Место предзащиты',
        field: 'location',
        valueGetter: (_, row: RowData) => row.data?.location,
        valueSetter: (value, row) => ({
            ...row,
            data: {
                ...row.data,
                location: value || null,
            },
        }),
        width: 180,
        editable: true,
    },
    {
        headerName: 'Командный проект',
        field: 'isCommand',
        type: 'singleSelect',
        valueOptions: [
            { value: true, label: 'Да' },
            { value: false, label: 'Нет' },
        ],
        valueGetter: (_, row: RowData) => row.data?.isCommand,
        valueSetter: (value, row) => ({
            ...row,
            data: {
                ...row.data,
                isCommand: value || null,
            },
        }),
        renderCell: rendeIsCommandCell,
        width: 100,
        editable: true,
    },
    {
        headerName: 'Оценка',
        headerAlign: 'left',
        align: 'center',
        field: 'mark',
        type: 'number',
        valueGetter: (_, row: RowData) => row.data?.mark,
        valueSetter: (value, row) => ({
            ...row,
            data: {
                ...row.data,
                mark: value || null,
            },
        }),
        valueParser: (value: number) => {
            if (value < 0) return 0;

            return value > 100 ? 100 : value;
        },
        width: 100,
        editable: true,
    },
    {
        headerName: 'Результат',
        field: 'result',
        type: 'singleSelect',
        valueOptions: Object.values(ResultStatus).map((status) => ({ value: status, label: ResultStatusRus[status] })),
        valueGetter: (_, row: RowData) => row.data?.result,
        valueSetter: (value, row) => ({
            ...row,
            data: {
                ...row.data,
                result: value || null,
            },
        }),
        renderCell: renderResultCell,
        width: 180,
        editable: true,
    },
    {
        headerName: 'Комментарий по предзащите',
        field: 'defenceComment',
        valueGetter: (_, row: RowData) => row.data?.comment,
        valueSetter: (value, row) => ({
            ...row,
            data: {
                ...row.data,
                comment: value || null,
            },
        }),
        renderCell: renderCommentCell,
        width: 500,
        sortable: false,
        editable: true,
        ...multilineColumn,
    },
];
export const generateColumns = (dataType?: DataType): GridColDef[] => {
    switch (dataType) {
        case DataType.PreDefence:
        case DataType.Defence:
            return [...baseColumns, ...defenceColumns];
        case DataType.FormattingReview:
            return [...baseColumns, ...formattingReviewColumns];
        default:
            return [];
    }
};

export { mapStudentRowToDto, mapStudentsTableDtoToModel } from './mapStudentsTableDtoToModel';
