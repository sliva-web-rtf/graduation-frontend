import { createAsyncThunk } from '@reduxjs/toolkit';

import { User, userActions } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';

export const loginByEmail = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
>(
  'user/getUser',
  async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get<User>('/api/auth');

      if (!response.data) {
        throw new Error();
      }

      UserSecretStorageService.save(JSON.stringify(response.data));
      dispatch(userActions.setAuthData(response.data));
      return response.data;
    } catch (e) {
      // TODO: сделать нормальный catching errors.
      return rejectWithValue('error');
    }
  },
);
