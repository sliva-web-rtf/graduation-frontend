import { createAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

const name = 'user';

export const actions = {
    successUser: createAction<User>(`${name}/successUser`),
    requestUser: createAction(`${name}/requestUser`),
    failureUser: createAction<string>(`${name}/failureUser`),
};
