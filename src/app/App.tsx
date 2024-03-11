import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited } from 'entities/User';

import { getUser } from 'entities/User/model/services/getUser';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import useAxios from 'shared/lib/hooks/useAxios/useAxios';

import { AppRouter } from './providers/router';

function App() {
  useAxios(); // TODO: пересмотреть это решение из-за возможной постоянной перерисовки
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      {inited && <AppRouter />}
    </div>
  );
}

export default App;
