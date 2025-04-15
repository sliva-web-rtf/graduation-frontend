import { RoutePath, RoutePathType } from '@/app/providers/Router';
import { StudentStatus, StudentStatusRus } from '@/entities/Person';
import { TopicStatus, TopicStatusRus } from '@/entities/Topic';
import {
    getColorByDocumentStatus,
    getColorByIsCommandStatus,
    getColorByResultStatus,
    getColorByStudentsStatus,
    getColorByTopicStatus,
} from '@/shared/lib/helpers/getColorByStatus';
import { getInfoPagePath } from '@/shared/lib/helpers/getInfoPagePath';
import { DocumentStatus, ResultStatus, ResultStatusRus } from '@/shared/lib/types/statuses';
import { BaseChip } from '@/shared/ui';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridValidRowModel } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { DataType, DefenceData, DocumentData, FormattingReviewData } from '../model';

type Entity = {
    id?: string;
    text?: string;
};

type RowData = { data: DefenceData & FormattingReviewData };

const getLinkCell = (params: Entity, route: RoutePathType) => {
    if (!params?.id || !params?.text) return null;

    const { id, text } = params;
    const path = getInfoPagePath(route, id);

    return <Link to={path}>{text || text}</Link>;
};

const renderLinkCell = (route: RoutePathType, textKey: keyof GridValidRowModel) => (params: GridRenderCellParams) =>
    getLinkCell(
        {
            id: params.value?.id,
            text: params.value?.[textKey],
        },
        route,
    );

const renderTopicStatusCell = (params: GridRenderCellParams<GridValidRowModel, TopicStatus>) => {
    const { value } = params;
    const color = getColorByTopicStatus(value);

    return <BaseChip label={(value && TopicStatusRus[value]) ?? TopicStatusRus.getUnknown} color={color} />;
};

const renderStudentStatusCell = (params: GridRenderCellParams<GridValidRowModel, StudentStatus>) => {
    const { value } = params;
    const color = getColorByStudentsStatus(value);

    return <BaseChip label={(value && StudentStatusRus[value]) ?? StudentStatusRus.getUnknown} color={color} />;
};

const renderResultCell = (params: GridRenderCellParams<GridValidRowModel, ResultStatus>) => {
    const { value } = params;
    const color = getColorByResultStatus(value);

    return <BaseChip label={(value && ResultStatusRus[value]) ?? ResultStatusRus.getUnknown} color={color} />;
};

const rendeIsCommandCell = (params: GridRenderCellParams<GridValidRowModel, boolean>) => {
    const { value } = params;
    const color = getColorByIsCommandStatus(value);

    return <BaseChip label={value ? 'Да' : 'Нет'} color={color} />;
};

const renderCommentCell = (params: GridRenderCellParams<GridValidRowModel, string>) => {
    const { value } = params;

    if (!value) {
        return null;
    }

    return (
        <Stack justifyContent="center" height="100%">
            <Tooltip title={value}>
                <Typography>{value}</Typography>
            </Tooltip>
        </Stack>
    );
};

const renderDocCell = (params: GridRenderCellParams<GridValidRowModel, DocumentStatus | undefined>) => {
    const { value } = params;
    const backgroundColor = getColorByDocumentStatus(value);

    return (
        <Stack alignItems="center" justifyContent="center" height="100%">
            <Box sx={{ backgroundColor, width: 16, height: 16 }} />
        </Stack>
    );
};

const DOCUMENTS = [
    'Заявление',
    'Задание',
    'Пояснительная записка',
    'Справка о наличии заимствовании',
    'Акт о внедрении',
] as const;
const formattingReviewColumns: GridColDef[] = DOCUMENTS.map((doc) => ({
    field: doc,
    headerName: doc,
    width: 100,
    valueGetter: (_, row: RowData) => row.data?.documents?.find((d: DocumentData) => d.name === doc)?.status,
    renderCell: renderDocCell,
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
    { field: 'topicStatus', headerName: 'Статус темы', width: 180, renderCell: renderTopicStatusCell, editable: true },
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
    { field: 'status', headerName: 'Статус студента', width: 180, renderCell: renderStudentStatusCell, editable: true },
];
const defenceColumns: GridColDef[] = [
    {
        field: 'isCommand',
        headerName: 'Командный проект',
        valueGetter: (_, row: RowData) => row.data?.isCommand,
        renderCell: rendeIsCommandCell,
        width: 100,
        editable: true,
    },
    {
        field: 'mark',
        headerName: 'Оценка',
        valueGetter: (_, row: RowData) => row.data?.mark,
        width: 100,
        editable: true,
    },
    {
        field: 'comment',
        headerName: 'Комментарий',
        valueGetter: (_, row: RowData) => row.data?.comment,
        renderCell: renderCommentCell,
        width: 500,
        sortable: false,
        editable: true,
    },
    {
        field: 'result',
        headerName: 'Результат',
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
