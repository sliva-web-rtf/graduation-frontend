import { SITENAME } from '@/shared/lib/const';
import { BaseAlert } from '@/shared/ui';
import { Catalog } from '@/widgets/Catalog';
import { Stack } from '@mui/material';
import { Helmet } from 'react-helmet';

const CatalogPage = () => (
    <>
        <Helmet>
            <title>Выбор темы | {SITENAME}</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            {/* {TODO: убрать после релиза} */}
            <BaseAlert severity="warning">Раздел находится в разработке, подать заявки не получится</BaseAlert>
            <Catalog />
        </Stack>
    </>
);

export default CatalogPage;
