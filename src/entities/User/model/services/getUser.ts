import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppError } from 'shared/lib/types/appError';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { AppErrorMapper, UNKNOW_ERROR } from 'shared/lib/types/mapper.ts/appErrorMapper';
import { isApiError } from 'shared/api';
import { getUserQuery } from '../../api/userApi';
import { actions } from '../actions';
import { userActions } from '../slice/userSlice';

export const getUser = createAsyncThunk<void, void, ThunkConfig<AppError>>('user/getUser', async (_, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(actions.requestUser());
    try {
        const user = await dispatch(getUserQuery(undefined)).unwrap();
        dispatch(actions.successUser(user));
        return undefined;
    } catch (error: unknown) {
        dispatch(userActions.setInitValue(true));
        if (isApiError(error)) {
            const appError = AppErrorMapper.fromDto(error);
            dispatch(actions.failureUser(appError.message));
        }
        dispatch(actions.failureUser(UNKNOW_ERROR));
    }
    return undefined;
});
