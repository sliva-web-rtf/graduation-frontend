import { Stack, Typography } from '@mui/material';
import { Catalog } from 'widgets/Catalog';

const CatalogPage = () => (
    <Stack spacing={4}>
        <Typography variant="h1">Каталог</Typography>
        <Catalog />
    </Stack>
);

export default CatalogPage;
