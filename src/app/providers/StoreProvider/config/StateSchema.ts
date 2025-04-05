/* eslint-disable no-unused-vars */
import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState } from 'redux';

import { UserSchema } from '@/entities/User';
import { YearSchema } from '@/entities/Year';
import { CommissionFormSchema } from '@/features/comission/create-comission';
import { baseApi } from '@/shared/api';
import { AdministrationSchema } from '@/widgets/Administration';
import { type CatalogSchema } from '@/widgets/Catalog';
import { PersonalDataSchema } from '@/widgets/PersonalData';
import { PersonInfoSchema } from '@/widgets/PersonInfo';
import { ProfileSchema } from '@/widgets/Profile';
import { RequestsSchema } from '@/widgets/Requests';
import { TopicInfoSchema } from '@/widgets/TopicInfo';

export interface StateSchema {
    [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
    user: UserSchema;
    year: YearSchema;
    catalog: CatalogSchema;
    requests: RequestsSchema;

    personalData?: PersonalDataSchema;
    profile?: ProfileSchema;
    commissionForm?: CommissionFormSchema;
    administration?: AdministrationSchema;
    'person-info'?: PersonInfoSchema;
    'topic-info'?: TopicInfoSchema;
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
