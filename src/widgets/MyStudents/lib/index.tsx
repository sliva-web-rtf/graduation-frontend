import { RoutePath, RoutePathType } from '@/app/providers/Router';
import { PersonMainInfo } from '@/entities/Person';
import { TopicCardModel } from '@/entities/Topic';
import { getInfoPagePath } from '@/shared/lib/helpers/getInfoPagePath';
import { BaseChip } from '@/shared/ui';
import { Box, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { GridRenderCellParams, GridValidRowModel } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

type Entity = {
    id: string;
    name: string;
};

export const getLinkCell = <T extends Entity>(
    params: GridRenderCellParams<GridValidRowModel, T>,
    route: RoutePathType,
) => {
    if (!params.value) return null;

    const { id, name } = params.value;
    const path = getInfoPagePath(route, id);

    return <Link to={path}>{name}</Link>;
};

export const renderStudentCell = (params: GridRenderCellParams<GridValidRowModel, PersonMainInfo>) =>
    getLinkCell(params, RoutePath.Students);

export const renderTopicCell = (params: GridRenderCellParams<GridValidRowModel, TopicCardModel>) =>
    getLinkCell(params, RoutePath.Topics);

export const renderSupervisorCell = (params: GridRenderCellParams<GridValidRowModel, TopicCardModel>) =>
    getLinkCell(params, RoutePath.Supervisors);

export const renderTopicStatusCell = (params: GridRenderCellParams<GridValidRowModel, string>) => {
    const { value } = params;

    // eslint-disable-next-line no-nested-ternary
    const color = value === 'Утверждена' ? 'success' : value === 'На рассмотрении' ? 'warning' : 'error';

    return <BaseChip label={params.value} color={color} />;
};

export const renderDocCell = (params: GridRenderCellParams<GridValidRowModel, boolean | undefined>) => {
    const { value } = params;

    return (
        <Stack alignItems="center" justifyContent="center" height="100%">
            <Box
                sx={{
                    // eslint-disable-next-line no-nested-ternary
                    backgroundColor: value === undefined ? 'unset' : value ? 'success.main' : 'primary.main',
                    border: value === undefined ? `1px solid ${grey[300]}` : 'none',
                    width: 16,
                    height: 16,
                }}
            />
        </Stack>
    );
};
