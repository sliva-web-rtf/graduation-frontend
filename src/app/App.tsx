import { useSelector } from 'react-redux';
import { getUserInited } from 'entities/User';

import useAxios from 'shared/lib/hooks/useAxios/useAxios';

import { AppRouter } from './providers/router';

function App() {
  useAxios(); // спорное решение
  const inited = useSelector(getUserInited);

  return (
    <div>
      {inited && <AppRouter />}
    </div>
  );
}

export default App;
