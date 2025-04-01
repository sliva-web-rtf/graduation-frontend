import { userReducer } from '@/entities/User';
import { baseApi } from '@/shared/api';
import { catalogReducer } from '@/widgets/Catalog';
import { requestsReducer } from '@/widgets/Requests/model';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState, Reducer } from 'redux';
import { createReducerManager } from './reducerManager';
import { rtkQueryErrorMiddleware } from './rtkErrorMiddleware';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        catalog: catalogReducer,
        requests: requestsReducer,
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
            }).concat(baseApi.middleware, rtkQueryErrorMiddleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type Store = ReturnType<typeof createReduxStore>;

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
