import { getUserData, ROLES } from '@/entities/User';
import { getInitials } from '@/shared/lib/helpers/getInitials';
import { Stack, Tooltip, Typography } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppMenu } from './Menu';
import classnames from './MenuBar.module.scss';

type MenuBarProps = {
    expanded?: boolean;
};

export const MenuBar = memo((props: MenuBarProps) => {
    const { expanded } = props;
    const { user } = useSelector(getUserData);

    if (!user) {
        return null;
    }

    const { roles, firstName, lastName, patronymic } = user;
    const translatedRoles = roles.map((role) => ROLES[role]).join(', ');
    const userInitials = getInitials(firstName, lastName, patronymic);

    return (
        <Stack direction="row" spacing={1} justifyContent="space-between" px={1} minHeight={40} alignItems="center">
            <AppMenu />
            {expanded && (
                <Stack>
                    <Typography color="primary" fontWeight={600} className={classnames.username}>
                        {userInitials}
                    </Typography>
                    {translatedRoles && (
                        <Tooltip title={translatedRoles}>
                            <Typography variant="bodyXS" color="secondary" className={classnames.username}>
                                {translatedRoles}
                            </Typography>
                        </Tooltip>
                    )}
                </Stack>
            )}
        </Stack>
    );
});
