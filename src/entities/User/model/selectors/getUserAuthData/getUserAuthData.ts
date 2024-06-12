import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserAuthData = createSelector(
    (state: StateSchema) => state.user,
    (data) => data.authData,
);
