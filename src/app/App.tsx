import { useSelector } from 'react-redux';
import { getUserInited } from 'entities/User';

import { AppRouter } from './providers/router';

function App() {
  const inited = useSelector(getUserInited);

  return (
    <div>
      {inited && <AppRouter />}
    </div>
  );
}

export default App;
