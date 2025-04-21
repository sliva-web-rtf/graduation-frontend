import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useEffect } from 'react';

import { userActions, useUserQuery } from '@/entities/User';
import { useGetDefaultYearQuery, yearActions } from '@/entities/Year';
import { PageLoader } from '@/shared/ui';
import { AppRouter } from './providers/Router';

function App() {
    const dispatch = useAppDispatch();
    const { isFetching: isUserFetching, data: user } = useUserQuery();
    const { isFetching: isDefaulYearFetching, data: defaultYear } = useGetDefaultYearQuery();

    useEffect(() => {
        if (user) {
            dispatch(userActions.setUser(user));
        }
    }, [user, dispatch]);

    useEffect(() => {
        dispatch(yearActions.setAcademicYear(defaultYear));
    }, [defaultYear, dispatch]);

    if (isUserFetching || isDefaulYearFetching) {
        return <PageLoader />;
    }

    return <AppRouter />;
}

export default App;
