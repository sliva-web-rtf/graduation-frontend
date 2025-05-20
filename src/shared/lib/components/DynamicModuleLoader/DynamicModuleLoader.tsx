/* eslint-disable no-unused-vars */
import { ReduxStoreWithManager, StateSchemaKey } from '@/app/providers/StoreProvider/config/StateSchema';
import { Reducer } from '@reduxjs/toolkit';
import { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children?: ReactNode;
    onReducerInitialized?: () => void;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { children, reducers, removeAfterUnmount = false, onReducerInitialized } = props;

    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        const currentReducers = store.reducerManager.getReducerMap();
        let isInitialized = false;

        Object.entries(reducers).forEach(([name, reducer]) => {
            if (!Object.keys(currentReducers).includes(name)) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
                isInitialized = true;
            }
        });

        if (isInitialized && onReducerInitialized) {
            onReducerInitialized();
        }

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
    }, [dispatch, reducers, removeAfterUnmount, store.reducerManager, onReducerInitialized]);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    );
};
