import React from 'react';
import { Paper, Stack } from '@mui/material';
import Logo from 'shared/ui/Logo/Logo';
import { BaseButton } from 'shared/ui/Button/Button';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { MenuBar } from 'widgets/MenuBar';
import { NavigationMenu } from 'widgets/NavigationMenu';
import styles from './Sidebar.module.scss';

export const Sidebar = () => (
  <Stack
    component={Paper}
    className={styles.wrapper}
    sx={{ borderRadius: 3, py: 4, pl: 1 }}
    justifyContent="space-between"
  >
    <Stack spacing={2}>
      <Logo />
      <MenuBar sx={{ pr: 1 }} />
      <NavigationMenu />
    </Stack>
    <BaseButton
      sx={{ ml: 1, alignSelf: 'flex-start' }}
      color="secondary"
      startIcon={<LogoutRoundedIcon />}
    >
      Выйти
    </BaseButton>
  </Stack>
);
