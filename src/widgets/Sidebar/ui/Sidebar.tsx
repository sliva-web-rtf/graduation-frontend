import React from 'react';
import { Box } from '@mui/material';
import Logo from 'shared/ui/Logo/Logo';
import { BaseButton } from 'shared/ui/Button/Button';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { MenuBar } from 'widgets/MenuBar';
import { NavigationMenu } from 'widgets/NavigationMenu';
import styles from './Sidebar.module.scss';

export const Sidebar = () => (
  <Box
    sx={{ backgroundColor: (theme) => theme.palette.background.default }}
    className={styles.wrapper}
  >
    <Logo />
    <MenuBar sx={{
      marginTop: (theme) => theme.spacing(2),
      paddingRight: (theme) => theme.spacing(1),
    }}
    />
    <NavigationMenu sx={{ marginTop: (theme) => theme.spacing(2) }} />
    <BaseButton
      sx={{
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
