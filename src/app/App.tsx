import { useSelector } from 'react-redux';

import { useEffect } from 'react';
import { getUserInited } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { AppRouter } from './providers/Router';
import { getUser } from '@/entities/User/model/services/getUser';

function App() {
    const dispatch = useAppDispatch();
    const isInited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{isInited && <AppRouter />}</>;
    // return <AppRouter />;
}

export default App;
