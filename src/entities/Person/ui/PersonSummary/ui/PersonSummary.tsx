import { RoutePath } from '@/app/providers/Router';
import { getInfoPagePath } from '@/shared/lib/helpers/getInfoPagePath';
import { getInitials } from '@/shared/lib/helpers/getInitials';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface PersonSummaryProps {
    id: string;
    name?: any;

    isLink?: boolean;
    isStudent?: boolean;
    role?: string;
}

export const PersonSummary: FC<PersonSummaryProps> = (props) => {
    const { id, name, role, isLink, isStudent } = props;
    const initials = getInitials(name);
    const path = getInfoPagePath(isStudent ? RoutePath.Students : RoutePath.Supervisors, id);

    return (
        <Stack textAlign="end">
            {isLink && id ? (
                <Typography component={NavLink} to={path} variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
                    {initials}
                </Typography>
            ) : (
                <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
                    {initials}
                </Typography>
            )}

            <Typography variant="bodyXS" color="secondary">
                {role}
            </Typography>
        </Stack>
    );
};
