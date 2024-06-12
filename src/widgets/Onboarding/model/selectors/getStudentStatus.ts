import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getStudentStatus = createSelector(
    (state: StateSchema) => state.onboarding,
    (data) => data?.studentStatus,
);
