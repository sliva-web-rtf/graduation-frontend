import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { refreshQuery } from '../../api/userApi';

export const refreshToken = createAsyncThunk<void, void, ThunkConfig<string>>('user/getToken', async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        const token = await UserSecretStorageService.get();
        if (token) {
            await dispatch(refreshQuery(token)).unwrap();
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
