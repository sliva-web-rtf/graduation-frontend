import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { TokenDto } from '../types/dto/token.dto';

interface LoginByEmailProps {
    email: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<
    string,
    LoginByEmailProps,
    ThunkConfig<string>
>(
  'login/loginByEmail',
  async (authData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.post<TokenDto>('/api/auth', authData);

      if (!response.data) {
        throw new Error();
      }

      UserSecretStorageService.save(JSON.stringify(response.data));
      return response.data.token;
    } catch (e) {
      // TODO: сделать нормальный catching errors.
      return rejectWithValue('error');
    }
  },
);
