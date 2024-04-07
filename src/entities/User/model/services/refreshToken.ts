import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { refreshQuery } from '../../api/userApi';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';

export const refreshToken = createAsyncThunk<void, void, ThunkConfig<string>>('user/getToken', async (_, thunkApi) => {
    const { rejectWithValue, dispatch, getState } = thunkApi;

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
        } else {
            throw Error('Не авторизован');
        }
        return undefined;
    } catch (e) {
        UserSecretStorageService.clear();
        if (e instanceof Error) {
            return rejectWithValue(e.message);
        }

        return rejectWithValue('неизвестная ошибка');
    }
});
