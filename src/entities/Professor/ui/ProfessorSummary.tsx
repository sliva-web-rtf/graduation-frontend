import { Avatar, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'app/providers/Router/config/routeConfig';
import { memo } from 'react';
import { getInfoPagePath } from 'shared/lib/helpers/getInfoPagePath';
import { getInitials } from 'shared/lib/helpers/getInitials';

interface ProfessorSummaryProps {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly patronymic?: string;
    readonly avatarImagePath?: string;
}

export const ProfessorSummary = memo((props: ProfessorSummaryProps) => {
    const { id, avatarImagePath, firstName, lastName, patronymic } = props;
    const name = getInitials(firstName, lastName, patronymic);

    return (
        <Stack direction="row" spacing={1}>
            <Avatar variant="circular" src={__API__ + avatarImagePath} sx={{ width: 40, height: 40 }} />
            <Stack>
                {id ? (
                    <Link to={getInfoPagePath(AppRoutes.Professors, id)}>
                        <Typography variant="h4">{name}</Typography>
                    </Link>
                ) : (
                    <Typography variant="h4">Не определен</Typography>
                )}
                <Typography variant="subtitle2" color="secondary">
                    Научный руководитель
                </Typography>
            </Stack>
        </Stack>
    );
});
