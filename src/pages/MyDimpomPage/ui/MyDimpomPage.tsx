import { SITENAME } from '@/shared/lib/const';
import { MyDimplom } from '@/widgets/MyDimplom';
import { Helmet } from 'react-helmet';

const MyDimpomPage = () => (
    <>
        <Helmet>
            <title>Мой диплом | {SITENAME}</title>
        </Helmet>
        <MyDimplom />
    </>
);

export default MyDimpomPage;
