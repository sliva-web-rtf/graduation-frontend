import { Box, Typography } from '@mui/material';
import { Catalog } from 'widgets/Catalog';
import styles from './CatalogPage.module.scss';

const CatalogPage = () => (
  <Box className={styles.catalog}>
    <Typography variant="h1">Каталог</Typography>
    <Catalog />
  </Box>
);

export default CatalogPage;
