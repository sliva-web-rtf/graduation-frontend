import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { isApiError } from 'shared/api';
import { AppErrorMapper, UNKNOW_ERROR } from 'shared/lib/types/mapper.ts/appErrorMapper';
import { AppError } from 'shared/lib/types/appError';
import { refreshQuery } from '../../api/userApi';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { actions } from '../actions';

export const refreshToken = createAsyncThunk<void, void, ThunkConfig<AppError>>(
    'user/getToken',
    async (_, thunkApi) => {
        const { dispatch, getState } = thunkApi;
        dispatch(actions.requestRefresh());
        try {
            const token = await UserSecretStorageService.get();
            const userId = await getUserAuthData(getState())?.id;
            if (token && userId) {
                await dispatch(
                    refreshQuery({
                        userId,
                        refreshToken: token.refreshToken,
                    }),
                ).unwrap();
                dispatch(actions.successRefresh());
            } else {
                dispatch(actions.failureRefresh(UNKNOW_ERROR));
                throw new AppError(UNKNOW_ERROR);
            }
            return undefined;
        } catch (error: unknown) {
            UserSecretStorageService.clear();
            if (isApiError(error)) {
                const appError = AppErrorMapper.fromDto(error);
                dispatch(actions.failureRefresh(appError.message));
                throw appError;
            }
            dispatch(actions.failureRefresh(UNKNOW_ERROR));
            throw new AppError(UNKNOW_ERROR);
        }
    },
);
