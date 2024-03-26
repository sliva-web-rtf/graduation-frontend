import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { getUser } from 'entities/User/model/services/getUser';
import { getTokenByEmail } from 'entities/User/api/userApi';
import { getLoginEmail } from '../selectors/getLoginEmail/getLoginEmail';
import { getLoginPassword } from '../selectors/getLoginPassword/getLoginPassword';

export const loginByEmail = createAsyncThunk<void, void, ThunkConfig<string>>(
    'login/loginByEmail',
    async (_, thunkApi) => {
        const { dispatch, rejectWithValue, getState } = thunkApi;

        try {
            const email = getLoginEmail(getState());
            const password = getLoginPassword(getState());
            await dispatch(getTokenByEmail({ email, password })).unwrap();
            await dispatch(getUser());
            return undefined;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            return rejectWithValue('неизвестная ошибка');
        }
    },
);
