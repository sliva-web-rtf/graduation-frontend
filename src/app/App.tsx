import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useEffect } from 'react';

import { userActions, useUserQuery } from '@/entities/User';
import { UserSecretStorageService } from '@/shared/lib/helpers/userSecretStorage';
import { PageLoader } from '@/shared/ui';
import { AppRouter } from './providers/Router';

function App() {
    const dispatch = useAppDispatch();
    const isInited = UserSecretStorageService.isValid();
    const { isFetching, data } = useUserQuery();

    useEffect(() => {
        if (data) {
            dispatch(userActions.setUser(data));
        }
    }, [data, dispatch]);

    if (isFetching) {
        return <PageLoader />;
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{isInited && <AppRouter />}</>;
}

export default App;
