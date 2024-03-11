import { Box } from '@mui/material';
import { BasePagination } from 'shared/ui/Pagination/Pagination';
import { CatalogSearch } from 'features/CatalogSearch';
import { CatalogList } from 'entities/CatalogList';
import { catalogCards } from '../model/mock';

export const Catalog = () => (
  <Box>
    <CatalogSearch />
    <CatalogList items={catalogCards} />
    <BasePagination count={10} />
  </Box>
);
