import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserInited } from 'entities/User';

import { AppRouter } from './providers/router';

function App() {
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    return (
        <div>
            <Suspense fallback="">
                {inited && <AppRouter />}
            </Suspense>
        </div>
    );
}

export default App;
