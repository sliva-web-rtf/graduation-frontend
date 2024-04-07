import { createAction } from '@reduxjs/toolkit';
import { Login } from 'entities/User';
import { AppError } from 'shared/lib/types/appError';

const name = 'login';

export const actions = {
    success: createAction(`${name}/success`),
    request: createAction(`${name}/request`),
    failure: createAction<AppError<Login>>(`${name}/failure`),
};
