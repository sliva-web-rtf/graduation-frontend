import { RoutePath } from '@/app/providers/Router';
import { StudentStatus, StudentStatusRus } from '@/entities/Person';
import { TopicStatus, TopicStatusRus } from '@/entities/Topic';
import {
    DocumentStatus,
    DocumentStatusRus,
    FormattingReviewStatus,
    FormattingReviewStatusRus,
    MovementStatus,
    ResultStatus,
    ResultStatusRus,
} from '@/shared/lib/types/statuses';
import { GridColDef, GridColTypeDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { DataType, DefenceData, FormattingReviewData } from '../model';
import { singleSelectOperators } from './filterOperators';
import {
    renderCommentCell,
    renderDocCell,
    RenderEditTextareaCell,
    RenderEditTimeCell,
    renderFormatingReviewResultCell,
    renderIsCommandCell,
    renderLinkCell,
    RenderMovementStatusCell,
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
const documentsColumns: GridColDef[] = DOCUMENTS.map((doc) => ({
    headerName: doc,
    field: `documents[${doc}]`,
    type: 'singleSelect',
    valueGetter: (_, row: RowData) => {
        const document = row.data?.documents.find((d) => d.name === doc);

        return { name: doc, status: document?.status ?? DocumentStatus.Empty };
    },
    valueOptions: Object.entries(DocumentStatusRus).map(([key, value]) => ({ value: key, label: value })),
    valueSetter: (newValue, row: RowData) => {
        const documents = row.data?.documents ?? [];
        const index = row.data?.documents.findIndex((d) => d.name === doc);
        const newDoc = { name: doc, status: newValue.status ?? newValue };

        return {
            ...row,
            data: {
                ...row.data,
                documents: [...documents.slice(0, index), newDoc, ...documents.slice(index + 1)],
            },
        };
    },
    display: 'flex',
    align: 'center',
    width: 100,
    renderCell: renderDocCell,
    editable: true,
    filterable: false,
}));
const formattingReviewColumns: GridColDef[] = [
    ...documentsColumns,
    {
        headerName: 'Результат нормоконтроля',
        field: 'result',
        type: 'singleSelect',
        valueOptions: Object.values(FormattingReviewStatus).map((status) => ({
            value: status,
            label: FormattingReviewStatusRus[status],
        })),
        valueGetter: (_, row: RowData) => row.data?.result,
        valueSetter: (value, row) => ({
            ...row,
            data: {
                ...row.data,
                result: value || null,
            },
        }),
        renderCell: renderFormatingReviewResultCell,
        width: 180,
        editable: true,
        filterable: false,
    },
];

const baseColumns: GridColDef[] = [
    {
        field: 'number',
        headerName: '№',
        width: 50,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        hideable: false,
        filterable: false,
    },
    {
        field: 'student',
        headerName: 'ФИО',
        width: 300,
        renderCell: renderLinkCell(RoutePath.Students, 'fullName'),
        display: 'flex',
        hideable: false,
        filterable: false,
    },
    {
        field: 'movementStatus',
        headerName: 'Комиссия',
        display: 'flex',
        align: 'center',
        width: 100,
        valueGetter: (_, row) => {
            return (
                row.commission ?? {
                    movementStatus: MovementStatus.Default,
                }
            );
        },
        renderCell: RenderMovementStatusCell,
        hideable: false,
        filterable: false,
    },
    { field: 'academicGroup', headerName: 'Группа', width: 110, filterable: false },
    {
        headerName: 'Статус студента',
        field: 'status',
        type: 'singleSelect',
        valueOptions: Object.values(StudentStatus).map((status) => ({
            value: status,
            label: StudentStatusRus[status],
        })),
        filterOperators: singleSelectOperators,
        width: 150,
        renderCell: renderStudentStatusCell,
        editable: true,
    },
    {
        field: 'topic',
        type: 'string',
        headerName: 'Тема ВКР',
        valueSetter: (value, row) => ({
            ...row,
            topic: {
                ...row.topic,
                name: value.name ?? value,
            },
        }),
        renderCell: renderLinkCell(RoutePath.Diplom, 'name'),
        renderEditCell: (params) => <RenderEditTextareaCell {...params} value={params.value?.name ?? ''} />,
        display: 'flex',
        width: 400,
        editable: true,
        filterable: false,
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
        filterable: false,
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
        editable: true,
        filterable: false,
    },
    {
        field: 'supervisor',
        headerName: 'Руководитель',
        valueSetter: (value, row) => ({
            ...row,
            supervisor: value
                ? {
                      id: value.value ?? value.id,
                      fullName: value.label ?? value.fullName,
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
        filterable: false,
    },
    { field: 'companyName', headerName: 'Предприятие', width: 300, editable: true, sortable: false, filterable: false },
    {
        field: 'companySupervisorName',
        headerName: 'Куратор от предприятия',
        width: 300,
        editable: true,
        sortable: false,
        filterable: false,
    },
    {
        headerName: 'Комментарий',
        field: 'comment',
        renderCell: renderCommentCell,
        width: 300,
        editable: true,
        sortable: false,
        filterable: false,
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
        filterable: false,
    },
    {
        headerName: 'Время предзащиты',
        field: 'time',
        type: 'dateTime',
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
        display: 'flex',
        width: 90,
        editable: true,
        filterable: false,
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
        sortable: false,
        filterable: false,
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
                isCommand: value ?? false,
            },
        }),
        renderCell: renderIsCommandCell,
        width: 100,
        editable: true,
        filterable: false,
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
        filterable: false,
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
        filterable: false,
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
        filterable: false,
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

export { buildDateRange } from './buildDateRange';
export { buildFilterQuery } from './buildFIlterQuery';
export { mapStudentRowToDto, mapStudentsTableDtoToModel } from './mapStudentsTableDtoToModel';
