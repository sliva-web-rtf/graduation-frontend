import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileInfo = createSelector(
    (state: StateSchema) => state.onboarding,
    (data) => data?.updatedProfileInfo,
);
