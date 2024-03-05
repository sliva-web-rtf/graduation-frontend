import { Box } from '@mui/material';
import { BasePagination } from 'shared/ui/Pagination/Pagination';
import CatalogList from 'entities/CatalogList/ui/CatalogList';
import { CatalogSearch } from 'features/CatalogSearch';
import { catalogCards } from '../model/mock';

const Catalog = () => (
  <Box>
    <CatalogSearch />
    <CatalogList items={catalogCards} />
    <BasePagination count={10} />
  </Box>
);

export default Catalog;
