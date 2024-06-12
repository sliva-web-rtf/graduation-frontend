import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Catalog } from '@/widgets/Catalog';

const CatalogPage = () => (
    <>
        <Helmet>
            <title>Каталог | SCI Join</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <Typography variant="h1">Каталог</Typography>
            <Catalog />
        </Stack>
    </>
);

export default CatalogPage;
