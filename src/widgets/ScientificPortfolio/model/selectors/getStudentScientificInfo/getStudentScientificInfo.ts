import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getStudentScientificInfo = createSelector(
    (state: StateSchema) => state.scientificPortfolio,
    (data) => data?.studentScientificInfo,
);
