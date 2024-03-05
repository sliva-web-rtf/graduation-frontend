import React from 'react';
import { Box } from '@mui/material';
import Logo from 'shared/ui/Logo/Logo';
import { MenuBar } from 'features/MenuBar';
import { NavigationMenu } from 'features/NavigationMenu';
import { BaseButton } from 'shared/ui/Button/Button';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import styles from './Sidebar.module.scss';

const Sidebar = () => (
  <Box sx={{ background: (theme) => theme.palette.background.default }} className={styles.wrapper}>
    <Logo />
    <MenuBar />
    <NavigationMenu />
    <BaseButton
      sx={{
        padding: (theme) => `${theme.spacing(1)} 12px`,
        marginLeft: (theme) => theme.spacing(1),
        marginTop: 'auto',
        alignSelf: 'flex-start',
      }}
      color="secondary"
      startIcon={<LogoutRoundedIcon />}
    >
      Выйти
    </BaseButton>
  </Box>
);

export default Sidebar;
