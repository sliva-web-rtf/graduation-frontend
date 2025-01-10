import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState } from 'redux';

import { type LoginSchema } from '@/features/auth/AuthByEmail/model/types/loginSchema';
import { UserSchema } from '@/entities/User';
import { type CatalogSchema } from '@/widgets/Catalog/model/types/catalogSchema';
import { baseApi } from '@/shared/api';
import { OnboardingSchema } from '@/widgets/Onboarding/model/types/onboardingSchema';
import { ProfessorInfoSchema } from '@/widgets/ProfessorInfo';
import { StudentInfoSchema } from '@/widgets/StudentInfo';
import { ManualSchema } from '@/widgets/Manual';
import { ProfileSchema } from '@/widgets/Profile';
import { ScientificPortfolioSchema } from '@/widgets/ScientificPortfolio';
import { RequestsSectionSchema } from '@/widgets/RequestsSection';
import { PersonalDataSchema } from '@/widgets/PersonalData/model/types/personalDataSchema';

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
    scientificPortfolio?: ScientificPortfolioSchema;
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
