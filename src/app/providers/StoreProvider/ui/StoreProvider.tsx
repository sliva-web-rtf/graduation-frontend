import { ReducersMapObject } from '@reduxjs/toolkit';
import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setupInterceptors } from 'app/interceptors';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProviderProps) => {
  const {
    children,
    initialState,
    asyncReducers,
  } = props;

  const navigate = useNavigate();

  const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        navigate,
  );

  // TODO: перенести в app.tsx
  useEffect(() => {
    setupInterceptors(store);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
