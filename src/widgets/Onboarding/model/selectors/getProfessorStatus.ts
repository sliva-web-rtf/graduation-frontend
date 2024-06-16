import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfessorStatus = createSelector(
    (state: StateSchema) => state.onboarding,
    (data) => data?.professorSearhingStatus,
);
