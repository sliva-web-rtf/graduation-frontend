import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState } from 'redux';

import { UserSchema } from '@/entities/User';
import { type LoginSchema } from '@/features/auth/AuthByEmail/model/types/loginSchema';
import { baseApi } from '@/shared/api';
import { type CatalogSchema } from '@/widgets/Catalog/model/types/catalogSchema';
import { ManualSchema } from '@/widgets/Manual';
import { OnboardingSchema } from '@/widgets/Onboarding/model/types/onboardingSchema';
import { PersonalDataSchema } from '@/widgets/PersonalData/model/types/personalDataSchema';
import { ProfessorInfoSchema } from '@/widgets/ProfessorInfo';
import { ProfileSchema } from '@/widgets/Profile';
import { RequestsSectionSchema } from '@/widgets/RequestsSection';
import { StudentInfoSchema } from '@/widgets/StudentInfo';

export interface StateSchema {
    user: UserSchema;
    [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;

    loginForm?: LoginSchema;
    catalog?: CatalogSchema;
    professor?: ProfessorInfoSchema;
    student?: StudentInfoSchema;
    manual?: ManualSchema;
    onboarding?: OnboardingSchema;
    personalData?: PersonalDataSchema;
    profile?: ProfileSchema;
    requestsSection?: RequestsSectionSchema;
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
