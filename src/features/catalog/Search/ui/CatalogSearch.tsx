import React, { memo } from 'react';
import { Box } from '@mui/material';
import { BaseSearch } from 'shared/ui/Search/Search';
import styles from './CatalogSearch.module.scss';

export const Search = memo(() => (
  <Box className={styles.inputs}>
    <BaseSearch placeholder="Поиск по ключевым словам" />
    <BaseSearch placeholder="Область науки и технологий" />
  </Box>
));
