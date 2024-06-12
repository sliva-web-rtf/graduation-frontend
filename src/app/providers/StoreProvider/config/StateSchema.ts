import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState } from 'redux';

import { LoginSchema } from '@/features/auth/AuthByEmail/model/types/loginSchema';
import { UserSchema } from '@/entities/User';
import { CatalogSchema } from '@/widgets/Catalog/model/types/catalogSchema';
import { baseApi } from '@/shared/api';
import { ProfessorInfoSchema } from '@/widgets/ProfessorInfo';
import { StudentInfoSchema } from '@/widgets/StudentInfo';

export interface StateSchema {
    user: UserSchema;
    catalog: CatalogSchema;
    professor: ProfessorInfoSchema;
    student: StudentInfoSchema;
    [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;

    // Асинхронные редюсеры
    loginForm?: LoginSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    state: StateSchema;
}
