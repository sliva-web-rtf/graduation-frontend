import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState, Reducer } from 'redux';
import { userReducer } from 'entities/User';
import { baseApi } from 'shared/api';
import { professorInfoReducer } from 'widgets/ProfessorInfo';
import { studentInfoReducer } from 'widgets/StudentInfo';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';
import { rtkQueryErrorMiddleware } from './rtkErrorMiddleware';

export function createReduxStore(initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        professor: professorInfoReducer,
        student: studentInfoReducer,
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
