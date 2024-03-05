import React from 'react';
import { Box } from '@mui/material';
import { BaseSearch } from 'shared/ui/Search/Search';
import BaseToggleButtonGroup from 'shared/ui/ToggleButtonGroup/ToggleButtonGroup';

const CatalogSearch = () => (
  <>
    <Box className="catalog__header__search">
      <BaseSearch placeholder="Поиск по ключевым словам" />
      <BaseSearch placeholder="Область науки и технологий" />
    </Box>
    <BaseToggleButtonGroup options={['Научные руководители', 'Темы исследований', 'Исследователи']} />
  </>
);

export default CatalogSearch;
