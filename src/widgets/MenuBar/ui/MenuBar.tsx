import React, { memo } from 'react';
import { AppBarProps, Avatar, Badge, Box, IconButton, Toolbar } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import { NavLink } from 'react-router-dom';
import { BaseAppBar } from '@/shared/ui/AppBar/AppBar';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';

interface MenuBarProps extends AppBarProps {}

export const MenuBar = memo(({ sx, ...props }: MenuBarProps) => (
    <Box sx={sx}>
        <BaseAppBar position="static" {...props}>
            <Toolbar>
                <Avatar sx={{ width: 48, height: 48 }} component={NavLink} to={RoutePath.Profile} />
                <IconButton color="primary">
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton color="primary">
                    <WorkspacePremiumOutlinedIcon />
                </IconButton>
                <IconButton color="primary">
                    <Badge badgeContent={2} color="error">
                        <NotificationsNoneRoundedIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </BaseAppBar>
    </Box>
));
