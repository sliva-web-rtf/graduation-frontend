import { Avatar, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { AppRoutes } from '@/app/providers/Router/config/routeConfig';
import { getInfoPagePath } from '@/shared/lib/helpers/getInfoPagePath';
import { getInitials } from '@/shared/lib/helpers/getInitials';

interface StudentSummaryProps {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly degree: string;
    readonly avatarImagePath?: string;
    readonly patronymic?: string;
}

export const StudentSummary = memo((props: StudentSummaryProps) => {
    const { id, avatarImagePath, firstName, lastName, patronymic, degree } = props;
    const name = getInitials(firstName, lastName, patronymic);

    return (
        <Stack direction="row" spacing={1}>
            <Avatar variant="circular" src={__API__ + avatarImagePath} sx={{ width: 40, height: 40 }} alt={name} />
            <Stack>
                <Link to={getInfoPagePath(AppRoutes.Students, id)}>
                    <Typography variant="h4">{name}</Typography>
                </Link>
                <Typography variant="subtitle2" color="secondary">
                    {degree}
                </Typography>
            </Stack>
        </Stack>
    );
});
