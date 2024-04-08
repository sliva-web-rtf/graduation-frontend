import { createAsyncThunk } from '@reduxjs/toolkit';
import { isApiError } from 'shared/api';
import { AppErrorMapper, UNKNOW_ERROR } from 'shared/lib/types/mapper.ts/appErrorMapper';
import { AppError } from 'shared/lib/types/appError';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { getTokenByEmail } from 'entities/User/api/userApi';
import { getUser } from 'entities/User/model/services/getUser';
import { type Login, validationLoginErrorsFromDto } from 'entities/User';
import { getLoginEmail } from '../selectors/getLoginEmail/getLoginEmail';
import { getLoginPassword } from '../selectors/getLoginPassword/getLoginPassword';
import { actions } from '../actions';

export const loginByEmail = createAsyncThunk<void, void, ThunkConfig<AppError<Login>>>(
    'login/loginByEmail',
    async (_, thunkApi) => {
        const { dispatch, getState } = thunkApi;
        dispatch(actions.request());
        try {
            const email = getLoginEmail(getState());
            const password = getLoginPassword(getState());
            await dispatch(getTokenByEmail({ email, password })).unwrap();
            await dispatch(getUser()).unwrap();
        } catch (error: unknown) {
            if (isApiError(error)) {
                const appError = AppErrorMapper.fromDtoWithValidationSupport(error, validationLoginErrorsFromDto);
                dispatch(actions.failure(appError));
                throw appError;
            }
            dispatch(actions.failure(new AppError(UNKNOW_ERROR)));
            throw new AppError(UNKNOW_ERROR);
        }

        return undefined;
    },
);
