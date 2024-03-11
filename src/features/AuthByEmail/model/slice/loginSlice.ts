import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByEmail } from '../services/loginByEmail';
import { LoginSchema } from '../types/loginSchema';

const initialState: LoginSchema = {
  isLoading: false,
  email: '',
  password: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<LoginSchema['email']>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<LoginSchema['password']>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByEmail.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginByEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
