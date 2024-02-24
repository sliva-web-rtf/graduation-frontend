import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited } from 'entities/User';

import { AppRouter } from './providers/router';

function App() {
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
