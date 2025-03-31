import { baseApi } from '@/shared/api';
import { UserSecretStorageService } from '@/shared/lib/helpers/userSecretStorage';
import { type Token } from '../../../shared/lib/types/token';
import { loginToDto } from '../lib/loginMapper';
import { mapTokenDtoToModel } from '../lib/tokenMapper';
import { mapUserDtoToModel } from '../lib/userMapper';
import { Login } from '../model/types/login';
import { type User } from '../model/types/user';
import { type TokenDto, UserDto } from './types';

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        user: build.query<User, undefined>({
            query: () => ({
                url: '/api/auth',
            }),
            transformResponse: (response: UserDto) => mapUserDtoToModel(response),
        }),
        auth: build.mutation<Token, Login>({
            query: (initialValues) => ({
                url: '/api/auth',
                method: 'POST',
                body: {
                    ...loginToDto(initialValues),
                },
            }),
            transformResponse: async (response: TokenDto) => {
                await UserSecretStorageService.save(response);
                return mapTokenDtoToModel(response);
            },
        }),
    }),
});

export const { useAuthMutation, useUserQuery } = userApi;
