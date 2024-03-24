import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { Token } from '../types/token';

export const refreshToken = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
  'user/getToken',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const token = await UserSecretStorageService.get();
      const response = await extra.api.put<Token>('/api/auth', {
        token,
      });

      if (!response.data) {
        throw new Error();
      }
      UserSecretStorageService.save(response.data.token);

      return undefined;
    } catch (e) {
      UserSecretStorageService.clear();
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }

      return rejectWithValue('неизвестная ошибка');
    }
  },
);
