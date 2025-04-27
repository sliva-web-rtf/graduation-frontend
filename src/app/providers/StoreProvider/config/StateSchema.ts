/* eslint-disable no-unused-vars */
import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState } from 'redux';

import { type UserSchema } from '@/entities/User';
import { type YearSchema } from '@/entities/Year';
import { type CommissionFormSchema } from '@/features/comission/create-comission';
import { baseApi } from '@/shared/api';
import { type AdministrationSchema } from '@/widgets/Administration';
import { type CatalogSchema } from '@/widgets/Catalog';
import { DiplomSchema } from '@/widgets/MyDiplom';
import { type MyStudentsSchema } from '@/widgets/MyStudents';
import { type PersonalDataSchema } from '@/widgets/PersonalData';
import { type PersonInfoSchema } from '@/widgets/PersonInfo';
import { type ProfileSchema } from '@/widgets/Profile';
import { type RequestsSchema } from '@/widgets/Requests';
import { type TopicInfoSchema } from '@/widgets/TopicInfo';

export interface StateSchema {
    [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
    user: UserSchema;
    year: YearSchema;
    catalog: CatalogSchema;
    requests: RequestsSchema;
    diplom: DiplomSchema;

    personalData?: PersonalDataSchema;
    profile?: ProfileSchema;
    commissionForm?: CommissionFormSchema;
    administration?: AdministrationSchema;
    myStudents?: MyStudentsSchema;
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
