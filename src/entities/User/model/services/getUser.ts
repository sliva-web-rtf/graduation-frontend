import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';

export const getUser = createAsyncThunk<User, void, ThunkConfig<string>>('user/getUser', async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<User>('/api/auth');

        if (!response.data) {
            throw new Error();
        }

        dispatch(userActions.setAuthData(response.data));
        return response.data;
    } catch (e) {
        dispatch(userActions.setInitValue(true));
        if (e instanceof Error) {
            return rejectWithValue(e.message);
        }
        return rejectWithValue('неизвестная ошибка');
    }
});
