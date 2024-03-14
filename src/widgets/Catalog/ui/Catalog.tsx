import { Stack } from '@mui/material';
import { BasePagination } from 'shared/ui/Pagination/Pagination';
import { Search } from 'features/catalog/Search';
import { ToggleList } from 'features/catalog/ToggleList';
import { ThemesActions } from 'features/catalog/ThemesActions';
import { useSelector } from 'react-redux';
import { memo } from 'react';
import { CatalogOptions } from 'shared/lib/types/options';
import { CatalogList } from '../../CatalogList';
import { catalogCards } from '../model/mock';
import { getCatalogOption } from '../model/selectors/getCatalogOption/getCatalogOption';

export const Catalog = memo(() => {
  const option = useSelector(getCatalogOption);

  return (
    <Stack spacing={4}>
      <Search />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <ToggleList value={option} />
        {option === CatalogOptions.Themes && <ThemesActions />}
      </Stack>
      <CatalogList items={catalogCards} />
      <BasePagination count={10} />
    </Stack>
  );
});
