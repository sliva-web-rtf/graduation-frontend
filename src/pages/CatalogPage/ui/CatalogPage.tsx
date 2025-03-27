import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Catalog } from '@/widgets/Catalog';

const CatalogPage = () => (
    <>
        <Helmet>
            <title>Выбор темы</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <Catalog />
        </Stack>
    </>
);

export default CatalogPage;
