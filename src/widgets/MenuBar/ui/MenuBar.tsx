import { AppBarProps, Box, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import { getUserAuthData, ROLES } from '@/entities/User';
import { getUserRoles } from '@/entities/User/model/selectors/getUserRoles/getUserRoles';
import { LogoutButton } from '@/features/logout';
import { getInitials } from '@/shared/lib/helpers/getInitials';
import { BaseAppBar } from '@/shared/ui/AppBar/AppBar';
import classnames from './MenuBar.module.scss';

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
                        <Tooltip title="Перейти в личный кабинет">
                            <Typography
                                variant="subtitle2"
                                color="primary"
                                component={NavLink}
                                to={RoutePath.Profile}
                                className={classnames.username}
                            >
                                {userInitials}
                            </Typography>
                        </Tooltip>
                        <Typography variant="bodyXS" color="secondary">
                            {roles || 'Нет роли'}
                        </Typography>
                    </Stack>
                    <LogoutButton />
                </Toolbar>
            </BaseAppBar>
        </Box>
    );
});
