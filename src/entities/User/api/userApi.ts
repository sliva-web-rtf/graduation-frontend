import { baseApi } from 'shared/api';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { Token } from '../model/types/token';
import { User } from '../model/types/user';
import { TokenDto, UserDto } from './types';
import { mapTokenDtoToModel } from '../lib/tokenMapper';
import { mapUserDtoToModel } from '../lib/userMapper';

interface getTokenByEmailValues {
    password: string;
    email: string;
}

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        refresh: build.mutation<Token, string>({
            query: (token) => ({
                url: '/api/auth',
                method: 'PUT',
                body: {
                    token,
                },
            }),
            transformResponse: async (response: TokenDto) => {
                await UserSecretStorageService.save(response.token);
                return mapTokenDtoToModel(response);
            },
        }),
        getUser: build.query<User, undefined>({
            query: () => ({
                url: '/api/auth',
            }),
            transformResponse: (response: UserDto) => mapUserDtoToModel(response),
        }),
        getTokenByEmail: build.mutation<Token, getTokenByEmailValues>({
            query: (initialValues) => ({
                url: '/api/auth',
                method: 'POST',
                body: {
                    ...initialValues,
                },
            }),
            transformResponse: async (response: TokenDto) => {
                await UserSecretStorageService.save(response.token);
                return mapTokenDtoToModel(response);
            },
        }),
    }),
});

export const refreshQuery = userApi.endpoints.refresh.initiate;
export const getUserQuery = userApi.endpoints.getUser.initiate;
export const getTokenByEmail = userApi.endpoints.getTokenByEmail.initiate;
