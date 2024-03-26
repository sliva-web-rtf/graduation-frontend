import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { getUserQuery } from '../../api/userApi';

export const getUser = createAsyncThunk<User, void, ThunkConfig<string>>('user/getUser', async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        const user = await dispatch(getUserQuery(undefined)).unwrap();
        dispatch(userActions.setAuthData(user));
        return user;
    } catch (e) {
        dispatch(userActions.setInitValue(true));
        if (e instanceof Error) {
            return rejectWithValue(e.message);
        }
        return rejectWithValue('неизвестная ошибка');
    }
});
