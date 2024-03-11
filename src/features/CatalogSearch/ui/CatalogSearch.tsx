import React, { memo } from 'react';
import { Box } from '@mui/material';
import { BaseSearch } from 'shared/ui/Search/Search';
import { BaseToggleButtonGroup } from 'shared/ui/ToggleButtonGroup/ToggleButtonGroup';
import styles from './CatalogSearch.module.scss';

export const CatalogSearch = memo(() => (
  <>
    <Box className={styles.catalogSearch}>
      <BaseSearch placeholder="Поиск по ключевым словам" />
      <BaseSearch placeholder="Область науки и технологий" />
    </Box>
    <BaseToggleButtonGroup options={['Научные руководители', 'Темы исследований', 'Исследователи']} />
  </>
));
