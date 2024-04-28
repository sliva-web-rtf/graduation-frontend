import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Role } from '../../types/roles';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(Role.Admin)));
