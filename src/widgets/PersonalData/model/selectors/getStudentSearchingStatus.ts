import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getStudentSearchingStatus = createSelector(
    (state: StateSchema) => state.personalData,
    (data) => data?.studentSearchingStatus,
);
