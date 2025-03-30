import { Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import { SITENAME } from '@/shared/lib/const';
import { Catalog } from '@/widgets/Catalog';

const CatalogPage = () => (
    <>
        <Helmet>
            <title>Выбор темы | {SITENAME}</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <Catalog />
        </Stack>
    </>
);

export default CatalogPage;
