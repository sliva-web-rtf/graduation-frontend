import { ReducersMapObject } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';
import { createReduxStore } from '@/app/providers/StoreProvider/config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: Partial<StateSchema>;
    // initialState?: DeepPartial<StateSchema>;
    asyncReducers?: Partial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState, asyncReducers } = props;

    const store = createReduxStore(initialState as StateSchema, asyncReducers as ReducersMapObject<StateSchema>);

    return <Provider store={store}>{children}</Provider>;
};
