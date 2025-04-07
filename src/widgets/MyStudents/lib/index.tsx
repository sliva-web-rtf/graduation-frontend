import { RoutePath, RoutePathType } from '@/app/providers/Router';
import { PersonMainInfo, StudentStatus, StudentStatusRus } from '@/entities/Person';
import { TopicCardModel, TopicStatus, TopicStatusRus } from '@/entities/Topic';
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
import { DataType } from '../model';

type Entity = {
    id: string;
    text: string;
};

export const getLinkCell = <T extends Entity>(
    params: GridRenderCellParams<GridValidRowModel, T>,
    route: RoutePathType,
) => {
    if (!params?.id || !params?.text) return null;

    const { id, text } = params;
    const path = getInfoPagePath(route, id);

    return <Link to={path}>{text || text}</Link>;
};

export const renderStudentCell = (params: GridRenderCellParams<GridValidRowModel, PersonMainInfo>) => {
    return getLinkCell({ ...params.value, text: params?.value?.fullName }, RoutePath.Students);
};

export const renderTopicCell = (params: GridRenderCellParams<GridValidRowModel, TopicCardModel>) =>
    getLinkCell({ ...params.value, text: params?.value?.name }, RoutePath.Topics);

export const renderSupervisorCell = (params: GridRenderCellParams<GridValidRowModel, TopicCardModel>) =>
    getLinkCell({ ...params.value, text: params?.value?.fullName }, RoutePath.Supervisors);

export const renderTopicStatusCell = (params: GridRenderCellParams<GridValidRowModel, string>) => {
    const { value } = params;
    const color = getColorByTopicStatus(value as TopicStatus);

    return <BaseChip label={TopicStatusRus[value as TopicStatus] ?? TopicStatusRus.getUnknown} color={color} />;
};

export const renderStudentStatusCell = (params: GridRenderCellParams<GridValidRowModel, string>) => {
    const { value } = params;
    const color = getColorByStudentsStatus(value as StudentStatus);

    return <BaseChip label={StudentStatusRus[value as StudentStatus]} color={color} />;
};

export const renderResultCell = (params: GridRenderCellParams<GridValidRowModel, string>) => {
    const { value } = params;
    const color = getColorByResultStatus(value as ResultStatus);

    return <BaseChip label={ResultStatusRus[value as ResultStatus] ?? ResultStatusRus.getUnknown} color={color} />;
};

export const rendeIsCommandCell = (params: GridRenderCellParams<GridValidRowModel, boolean>) => {
    const { value } = params;
    const color = getColorByIsCommandStatus(value);

    return <BaseChip label={value ? 'Да' : 'Нет'} color={color} />;
};

export const renderCommentCell = (params: GridRenderCellParams<GridValidRowModel, string>) => {
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

export const renderDocCell = (params: GridRenderCellParams<GridValidRowModel, DocumentStatus | undefined>) => {
    const { value } = params;
    const backgroundColor = getColorByDocumentStatus(value);

    return (
        <Stack alignItems="center" justifyContent="center" height="100%">
            <Box sx={{ backgroundColor, width: 16, height: 16 }} />
        </Stack>
    );
};

const documents = [
    'Заявление',
    'Задание',
    'Пояснительная записка',
    'Справка о наличии заимствовании',
    'Акт о внедрении',
];
export const createDocumentColumns = (): GridColDef[] => {
    return documents.map((doc, index) => ({
        field: `doc_${index}`,
        headerName: doc,
        width: 100,
        valueGetter: (_, row) => row.data?.documents?.find((d) => d.name === doc)?.status,
        renderCell: renderDocCell,
    }));
};

export const generateColumns = (dataType?: DataType): GridColDef[] => {
    const baseColumns: GridColDef[] = [
        {
            field: 'id',
            headerName: '№',
            width: 50,
            align: 'center',
        },
        {
            field: 'student',
            headerName: 'ФИО',
            width: 300,
            sortable: false,
            renderCell: renderStudentCell,
        },
        {
            field: 'academicGroup',
            headerName: 'Группа',
            width: 110,
        },
        { field: 'topic', headerName: 'Тема', width: 400, sortable: false, renderCell: renderTopicCell },
        { field: 'topicStatus', headerName: 'Статус темы', width: 180, renderCell: renderTopicStatusCell },
        { field: 'role', headerName: 'Роль', width: 200 },
        {
            field: 'supervisor',
            headerName: 'Руководитель',
            width: 300,
            renderCell: renderSupervisorCell,
            sortable: false,
        },
        { field: 'companyName', headerName: 'Предприятие', width: 300, sortable: false },
        { field: 'companySupervisor', headerName: 'Куратор от предприятия', width: 300, sortable: false },
        { field: 'status', headerName: 'Статус студента', width: 180, renderCell: renderStudentStatusCell },
    ];

    switch (dataType) {
        case DataType.PreDefence:
        case DataType.Defence:
            return [
                ...baseColumns,
                {
                    field: 'isCommand',
                    headerName: 'Командный проект',
                    valueGetter: (_, row) => row.data?.isCommand,
                    renderCell: rendeIsCommandCell,
                    width: 100,
                },
                {
                    field: 'mark',
                    headerName: 'Оценка',
                    valueGetter: (_, row) => row.data?.mark,
                    width: 100,
                },
                {
                    field: 'comment',
                    headerName: 'Комментарий',
                    valueGetter: (_, row) => row.data?.comment,
                    renderCell: renderCommentCell,
                    width: 500,
                    sortable: false,
                },
                {
                    field: 'result',
                    headerName: 'Результат',
                    valueGetter: (_, row) => row.data?.result,
                    renderCell: renderResultCell,
                    width: 180,
                },
            ];
        case DataType.FormattingReview:
            return [...baseColumns, ...createDocumentColumns()];
        default:
            return [];
    }
};

export { mapStudentsTableDtoToModel } from './mapStudentsTableDtoToModel';
