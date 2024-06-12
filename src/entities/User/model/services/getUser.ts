import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AppErrorMapper, UNKNOW_ERROR } from '@/shared/lib/types/mapper.ts/appErrorMapper';
import { isApiError } from '@/shared/api';
import { getUserQuery } from '../../api/userApi';
import { actions } from '../actions';
import { userActions } from '../slice/userSlice';

export const getUser = createAsyncThunk<void, void, ThunkConfig<void>>('user/getUser', async (_, thunkApi) => {
    const { dispatch } = thunkApi;
    dispatch(actions.requestUser());
    try {
        const user = await dispatch(getUserQuery(undefined)).unwrap();
        dispatch(actions.successUser(user));
    } catch (error: unknown) {
        if (isApiError(error)) {
            if (error.status !== 401) {
                dispatch(userActions.setInitValue(true));
            }
            const appError = AppErrorMapper.fromDto(error);
            dispatch(actions.failureUser(appError.message));
        }
        dispatch(actions.failureUser(UNKNOW_ERROR));
    }
});
