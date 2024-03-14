import { Box, Stack } from '@mui/material';
import { BasePagination } from 'shared/ui/Pagination/Pagination';
import { CatalogSearch } from 'features/CatalogSearch';
import { CatalogList } from 'entities/CatalogList';
import { catalogCards } from '../model/mock';

export const Catalog = () => (
  <Stack spacing={4}>
    <CatalogSearch />
    <CatalogList items={catalogCards} />
    <BasePagination count={10} />
  </Stack>
);
