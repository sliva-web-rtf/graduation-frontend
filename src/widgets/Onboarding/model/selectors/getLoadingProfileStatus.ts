import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsLoadingState = createSelector(
    (state: StateSchema) => state.onboarding,
    (data) => data?.isProfileLoading,
);
