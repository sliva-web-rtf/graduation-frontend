import { AppBarProps, Box, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import { getUserData } from '@/entities/User';
import { LogoutButton } from '@/features/logout';
import { getInitials } from '@/shared/lib/helpers/getInitials';
import { BaseAppBar } from '@/shared/ui/AppBar/AppBar';
import classnames from './MenuBar.module.scss';

interface MenuBarProps extends AppBarProps {}

export const MenuBar = memo(({ sx, ...props }: MenuBarProps) => {
    const { user } = useSelector(getUserData);

    if (!user) {
        return null;
    }

    const { roles, firstName, lastName } = user;
    const userInitials = getInitials(firstName, lastName);

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
