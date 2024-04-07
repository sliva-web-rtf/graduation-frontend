import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState, Reducer } from 'redux';
import { userReducer } from 'entities/User';
import { baseApi } from 'shared/api';
import { catalogReducer } from 'widgets/Catalog/model/slice/catalogSlice';
import { invalidateAccessTokenListener } from 'features/auth/InvalidateAccessToken/model/listener';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        catalog: catalogReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(baseApi.middleware, invalidateAccessTokenListener.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type Store = ReturnType<typeof createReduxStore>;

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
