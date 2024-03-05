import React from 'react';
import {
  Avatar, Badge, Box, IconButton, Toolbar,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { BaseAppBar } from 'shared/ui/AppBar/AppBar';
import { theme } from 'shared/theme';

const MenuBar = () => (
  <Box sx={{ padding: `0 ${theme.spacing(1)}` }}>
    <BaseAppBar position="static">
      <Toolbar>
        <Avatar sx={{ width: 48, height: 48 }}>A</Avatar>
        <IconButton color="primary"><SettingsOutlinedIcon /></IconButton>
        <IconButton color="primary"><WorkspacePremiumOutlinedIcon /></IconButton>
        <IconButton color="primary">
          <Badge badgeContent={2} color="error"><NotificationsNoneRoundedIcon /></Badge>
        </IconButton>
      </Toolbar>
    </BaseAppBar>
  </Box>
);

export default MenuBar;
