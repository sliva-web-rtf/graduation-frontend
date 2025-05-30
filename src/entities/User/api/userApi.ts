import { baseApi, isApiError } from '@/shared/api';
import { UserSecretStorageService } from '@/shared/lib/helpers/userSecretStorage';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type Token } from '../../../shared/lib/types/token';
import { mapTokenDtoToModel } from '../lib/tokenMapper';
import { mapUserDtoToModel } from '../lib/userMapper';
import { Login } from '../model/types/login';
import { type User } from '../model/types/user';
import { type TokenDto, UserDto } from './types';

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        user: build.query<User, void>({
            query: () => ({
                url: '/auth',
            }),
            transformResponse: (response: UserDto) => mapUserDtoToModel(response),
        }),
        auth: build.mutation<Token, Login>({
            query: (body) => ({
                url: '/auth',
                method: 'POST',
                body,
            }),
            transformResponse: async (response: TokenDto) => {
                await UserSecretStorageService.save(response);
                return mapTokenDtoToModel(response);
            },
            transformErrorResponse: (error: FetchBaseQueryError) => {
                if (isApiError(error)) {
                    return new Error(error.data.title);
                }

                return new Error('Произошла ошибка при авторизации');
            },
        }),
    }),
});

export const { useAuthMutation, useUserQuery } = userApi;
