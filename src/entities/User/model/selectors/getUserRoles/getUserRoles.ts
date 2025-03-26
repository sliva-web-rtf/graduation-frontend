import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Role } from '../../types/role';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(Role.Admin)));
export const isUserProfessor = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(Role.Professor)));
export const isUserStudent = createSelector(getUserRoles, (roles) => Boolean(roles?.includes(Role.Student)));
