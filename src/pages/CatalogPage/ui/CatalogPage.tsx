import { Box, Typography } from '@mui/material';
import Catalog from 'widgets/Catalog/ui/Catalog';

const CatalogPage = () => (
  <Box className="catalog">
    <Typography variant="h1">Каталог</Typography>
    <Catalog />
  </Box>
);

export default CatalogPage;
