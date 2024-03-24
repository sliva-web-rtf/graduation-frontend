import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { getUser } from 'entities/User/model/services/getUser';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { Token } from '../../../../entities/User/model/types/token';
import { getLoginEmail } from '../selectors/getLoginEmail/getLoginEmail';
import { getLoginPassword } from '../selectors/getLoginPassword/getLoginPassword';

export const loginByEmail = createAsyncThunk<void, void, ThunkConfig<string>>(
    'login/loginByEmail',
    async (_, thunkApi) => {
        const { extra, dispatch, rejectWithValue, getState } = thunkApi;

        try {
            const email = getLoginEmail(getState());
            const password = getLoginPassword(getState());

            const response = await extra.api.post<Token>('/api/auth', {
                email,
                password,
            });

            if (!response.data) {
                throw new Error();
            }

            UserSecretStorageService.save(response.data.token);
            dispatch(getUser());
            return undefined;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            return rejectWithValue('неизвестная ошибка');
        }
    },
);
