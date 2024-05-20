import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OnboardingSchema } from '../types/onboardingSchema';
import { PersonalInfoFormSchema } from '../types/personalInfoFormSchema';

const initialState: OnboardingSchema = {};

export const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        setUpdatedProfileInfo: (state, action: PayloadAction<PersonalInfoFormSchema>) => {
            state.updatedProfileInfo = action.payload;
        },
    },
});

export const { actions: onboardingActions } = onboardingSlice;
export const { reducer: onboardingReducer } = onboardingSlice;
