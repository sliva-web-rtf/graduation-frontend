/* eslint-disable no-unused-vars */
import { Reducer } from '@reduxjs/toolkit';
import { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager, StateSchemaKey } from '@/app/providers/StoreProvider/config/StateSchema';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children?: ReactNode;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { children, reducers, removeAfterUnmount = false } = props;

    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        const currentReducers = store.reducerManager.getReducerMap();
        Object.entries(reducers).forEach(([name, reducer]) => {
            if (!Object.keys(currentReducers).includes(name)) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    );
};
