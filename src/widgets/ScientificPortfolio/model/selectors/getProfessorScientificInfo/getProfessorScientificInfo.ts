import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfessorScientificInfo = createSelector(
    (state: StateSchema) => state.scientificPortfolio,
    (data) => data?.professorScientificInfo,
);
