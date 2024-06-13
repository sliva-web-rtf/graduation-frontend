import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OnboardingSchema } from '../types/onboardingSchema';
import { PersonalInfoFormSchema } from '../types/personalInfoFormSchema';
import { ScientificFormSchema } from '../types/scientificFormSchema';
import { StudentSearchingStatus } from '../types/studentStatus';

const initialState: OnboardingSchema = {
    isProfileLoading: false,
};

export const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        setUpdatedProfileInfo: (state, action: PayloadAction<PersonalInfoFormSchema | undefined>) => {
            state.updatedProfileInfo = action.payload;
        },
        setStudentScientificInfo: (state, action: PayloadAction<ScientificFormSchema | undefined>) => {
            state.studentScientificInfo = action.payload;
        },
        setStudentStudentStatus: (state, action: PayloadAction<StudentSearchingStatus | undefined>) => {
            state.studentStatus = action.payload;
        },
        setLoadingState: (state, action: PayloadAction<boolean>) => {
            state.isProfileLoading = action.payload;
        },
    },
});

export const { actions: onboardingActions } = onboardingSlice;
export const { reducer: onboardingReducer } = onboardingSlice;
