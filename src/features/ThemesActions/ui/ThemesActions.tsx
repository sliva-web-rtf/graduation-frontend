import { BaseButton } from 'shared/ui/Button/Button';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import React from 'react';
import { Box } from '@mui/material';
import { AddThemeModal } from 'features/AddThemeModal';
import styles from './ThemesActions.module.scss';

export const ThemesActions = () => (
  <Box className={styles.ThemesActions}>
    <BaseButton
      sx={{ padding: (theme) => theme.spacing(1) }}
      variant="shadowed"
    >
      <SortRoundedIcon />
    </BaseButton>
    <AddThemeModal />
  </Box>
);
