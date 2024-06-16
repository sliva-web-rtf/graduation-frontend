import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfessorProfileInfo = createSelector(
    (state: StateSchema) => state.onboarding,
    (data) => data?.updatedProfessorProfileInfo,
);
