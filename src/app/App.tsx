import { useUserQuery } from '@/entities/User';
import { useGetDefaultYearQuery } from '@/entities/Year';
import { PageLoader } from '@/shared/ui';
import { AppRouter, useHomePage } from './providers/Router';

function App() {
    const { isFetching: isUserFetching } = useUserQuery();
    const { isFetching: isDefaulYearFetching } = useGetDefaultYearQuery();

    useHomePage();

    if (isUserFetching || isDefaulYearFetching) {
        return <PageLoader />;
    }

    return <AppRouter />;
}

export default App;
