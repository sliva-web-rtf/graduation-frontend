import { SITENAME } from '@/shared/lib/const';
import { Comissions } from '@/widgets/Comissions';
import { Helmet } from 'react-helmet';

const CommissionsPage = () => (
    <>
        <Helmet>
            <title>Комиссии | {SITENAME}</title>
        </Helmet>
        <Comissions />
    </>
);

export default CommissionsPage;
