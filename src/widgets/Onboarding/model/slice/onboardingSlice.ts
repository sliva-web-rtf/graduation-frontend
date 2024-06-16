import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OnboardingSchema } from '../types/onboardingSchema';
import { PersonalInfoFormSchema } from '../types/personalInfoFormSchema';
import { ScientificFormSchema } from '../types/scientificFormSchema';
import { StudentSearchingStatus } from '../types/studentStatus';
import { STATUS } from '@/shared/api/status';
import { ProfessorPersonalInfoFormSchema } from '../types/professorInfoFormSchema';
import { ProfessorScientificFormSchema } from '../types/professorScientificFormSchema';
import { ProfessorSearchingStatus } from '../types/professorStatus';

const initialState: OnboardingSchema = {
    isProfileLoading: STATUS.initial,
};

export const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        setUpdatedProfileInfo: (state, action: PayloadAction<PersonalInfoFormSchema | undefined>) => {
            state.updatedProfileInfo = action.payload;
        },
        setProfessorUpdatedProfileInfo: (state, action: PayloadAction<ProfessorPersonalInfoFormSchema | undefined>) => {
            state.updatedProfessorProfileInfo = action.payload;
        },
        setStudentScientificInfo: (state, action: PayloadAction<ScientificFormSchema | undefined>) => {
            state.studentScientificInfo = action.payload;
        },
        setStudentStudentStatus: (state, action: PayloadAction<StudentSearchingStatus | undefined>) => {
            state.studentStatus = action.payload;
        },
        setProfessorSearchingStatus: (state, action: PayloadAction<ProfessorSearchingStatus | undefined>) => {
            state.professorSearhingStatus = action.payload;
        },
        setProfessorScientificPortfolio: (state, action: PayloadAction<ProfessorScientificFormSchema | undefined>) => {
            state.professorScientificInfo = action.payload;
        },
        setLoadingState: (state, action: PayloadAction<STATUS>) => {
            state.isProfileLoading = action.payload;
        },
    },
});

export const { actions: onboardingActions } = onboardingSlice;
export const { reducer: onboardingReducer } = onboardingSlice;
