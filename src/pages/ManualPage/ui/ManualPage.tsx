import { Helmet } from 'react-helmet';
import { Manual } from 'widgets/Manual';

const ManualPage = () => (
    <>
        <Helmet>
            <title>Справочник исследователя | SCI Join</title>
        </Helmet>
        <Manual />
    </>
);

export default ManualPage;
