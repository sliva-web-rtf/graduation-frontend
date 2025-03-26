import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState } from 'redux';

import { UserSchema } from '@/entities/User';
import { type LoginSchema } from '@/features/auth/AuthByEmail/model/types/loginSchema';
import { baseApi } from '@/shared/api';
import { type CatalogSchema } from '@/widgets/Catalog/model/types/catalogSchema';
import { ManualSchema } from '@/widgets/Manual';
import { OnboardingSchema } from '@/widgets/Onboarding/model/types/onboardingSchema';
import { PersonalDataSchema } from '@/widgets/PersonalData/model/types/personalDataSchema';
import { ProfileSchema } from '@/widgets/Profile';
import { RequestsSectionSchema } from '@/widgets/RequestsSection';
import { StudentInfoSchema } from '@/widgets/StudentInfo';
import { PersonInfoSchema } from '@/widgets/PersonInfo';

export interface StateSchema {
    [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
    user: UserSchema;

    loginForm?: LoginSchema;
    catalog?: CatalogSchema;
    student?: StudentInfoSchema;
    manual?: ManualSchema;
    onboarding?: OnboardingSchema;
    personalData?: PersonalDataSchema;
    profile?: ProfileSchema;
    requestsSection?: RequestsSectionSchema;
    'person-info'?: PersonInfoSchema;
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
