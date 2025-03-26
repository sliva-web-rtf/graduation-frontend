import { memo } from 'react';
import { AppBarProps, Box, Stack, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BaseAppBar } from '@/shared/ui/AppBar/AppBar';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import { getUserRoles } from '@/entities/User/model/selectors/getUserRoles/getUserRoles';
import { LogoutButton } from '@/features/logout';
import classnames from './MenuBar.module.scss';
import { getUserAuthData, ROLES } from '@/entities/User';
import { getInitials } from '@/shared/lib/helpers/getInitials';

interface MenuBarProps extends AppBarProps {}

export const MenuBar = memo(({ sx, ...props }: MenuBarProps) => {
    const user = useSelector(getUserAuthData);
    const userRoles = useSelector(getUserRoles);
    const userInitials = getInitials(user?.firstName, user?.lastName);
    const roles = userRoles?.map((role) => ROLES[role]).join(', ');

    return (
        <Box sx={sx}>
            <BaseAppBar position="static" {...props}>
                <Toolbar sx={{ gap: 1 }}>
                    <Stack>
                        <Typography
                            variant="subtitle2"
                            color="primary"
                            component={NavLink}
                            to={RoutePath.Profile}
                            className={classnames.username}
                        >
                            {userInitials}
                        </Typography>
                        <Typography variant="subtitle1" color="secondary">
                            {roles || 'Нет роли'}
                        </Typography>
                    </Stack>
                    <LogoutButton />
                </Toolbar>
            </BaseAppBar>
        </Box>
    );
});
