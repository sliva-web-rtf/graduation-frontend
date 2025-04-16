import { RoutePath } from '@/app/providers/Router';
import { StudentStatus, StudentStatusRus } from '@/entities/Person';
import { TopicStatus, TopicStatusRus } from '@/entities/Topic';
import { DocumentStatusRus, ResultStatus, ResultStatusRus } from '@/shared/lib/types/statuses';
import { GridColDef, GridColTypeDef } from '@mui/x-data-grid';
import { DataType, DefenceData, DocumentData, FormattingReviewData } from '../model';
import {
    rendeIsCommandCell,
    renderCommentCell,
    renderDocCell,
    RenderEditTextareaCell,
    RenderEditTimeCell,
    renderLinkCell,
    renderResultCell,
    renderStudentStatusCell,
    renderTopicStatusCell,
} from './renderCells';

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
const formattingReviewColumns: GridColDef[] = DOCUMENTS.map((doc) => ({
    headerName: doc,
    field: doc,
    type: 'singleSelect',
    valueOptions: Object.entries(DocumentStatusRus).map(([key, value]) => ({ value: key, label: value })),
    valueGetter: (value, row: RowData) =>
        (value || row.data?.documents?.find((d: DocumentData) => d.name === doc)?.status) ?? '',
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
        headerName: 'Тема',
        display: 'flex',
        width: 400,
        renderCell: renderLinkCell(RoutePath.Topics, 'name'),
        sortable: false,
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
    { field: 'role', headerName: 'Роль', width: 200, sortable: false, editable: true },
    {
        field: 'supervisor',
        headerName: 'Руководитель',
        width: 300,
        renderCell: renderLinkCell(RoutePath.Supervisors, 'fullName'),
        sortable: false,
        editable: true,
    },
    { field: 'companyName', headerName: 'Предприятие', width: 300, sortable: false, editable: true },
    { field: 'companySupervisor', headerName: 'Куратор от предприятия', width: 300, sortable: false, editable: true },
    {
        headerName: 'Статус студента',
        field: 'status',
        type: 'singleSelect',
        valueOptions: Object.values(StudentStatus).map((status) => ({
            value: status,
            label: StudentStatusRus[status],
        })),
        width: 180,
        renderCell: renderStudentStatusCell,
        editable: true,
    },
];
const defenceColumns: GridColDef[] = [
    {
        headerName: 'Дата предзащиты',
        field: 'date',
        type: 'date',
        valueGetter: (value) => value && new Date(value),
        valueParser: (value: Date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return value < today ? today : value;
        },
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
        valueFormatter: (value: Date) => {
            if (!value) return '';

            return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },
        renderEditCell: (params) => <RenderEditTimeCell {...params} />,
    },
    {
        headerName: 'Командный проект',
        field: 'isCommand',
        type: 'singleSelect',
        valueOptions: [
            { value: 'true', label: 'Да' },
            { value: 'false', label: 'Нет' },
        ],
        valueGetter: (_, row: RowData) => row.data?.isCommand,
        renderCell: rendeIsCommandCell,
        width: 100,
        editable: true,
    },
    {
        headerName: 'Оценка',
        headerAlign: 'left',
        field: 'mark',
        type: 'number',
        valueGetter: (_, row: RowData) => row.data?.mark,
        valueParser: (value: number) => {
            if (value < 0) return 0;

            return value > 100 ? 100 : value;
        },
        width: 100,
        editable: true,
    },
    {
        headerName: 'Комментарий',
        field: 'comment',
        valueGetter: (_, row: RowData) => row.data?.comment,
        renderCell: renderCommentCell,
        width: 500,
        sortable: false,
        editable: true,
        ...multilineColumn,
    },
    {
        headerName: 'Результат',
        field: 'result',
        type: 'singleSelect',
        valueOptions: Object.values(ResultStatus).map((status) => ({ value: status, label: ResultStatusRus[status] })),
        valueGetter: (_, row: RowData) => row.data?.result,
        renderCell: renderResultCell,
        width: 180,
        editable: true,
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

export { mapStudentsTableDtoToModel } from './mapStudentsTableDtoToModel';
