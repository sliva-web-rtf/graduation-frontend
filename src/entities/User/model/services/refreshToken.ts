import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { TokenDto } from 'features/AuthByEmail/model/types/dto/token.dto';

export const refreshToken = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
  'user/getToken',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.put<TokenDto>('/api/auth');

      if (!response.data) {
        throw new Error();
      }
      UserSecretStorageService.save(response.data.token);

      return;
    } catch (e) {
      // TODO: сделать нормальный catching errors.
      // eslint-disable-next-line consistent-return
      return rejectWithValue('error');
    }
  },
);
