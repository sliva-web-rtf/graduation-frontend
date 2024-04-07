import { baseApi } from 'shared/api';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { type Token } from '../../../shared/lib/types/token';
import { type User } from '../model/types/user';
import { type TokenDto, UserDto } from './types';
import { mapTokenDtoToModel } from '../lib/tokenMapper';
import { mapUserDtoToModel } from '../lib/userMapper';

interface getTokenByEmailValues {
    password: string;
    email: string;
}

interface refreshValues {
    userId: User['id'];
    refreshToken: Token['refreshToken'];
}

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        refresh: build.mutation<Token, refreshValues>({
            query: (values) => ({
                url: '/api/auth',
                method: 'PUT',
                body: {
                    ...values,
                },
            }),
            transformResponse: async (response: TokenDto) => {
                await UserSecretStorageService.save(response);
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
                await UserSecretStorageService.save(response);
                return mapTokenDtoToModel(response);
            },
        }),
    }),
});

export const refreshQuery = userApi.endpoints.refresh.initiate;
export const getUserQuery = userApi.endpoints.getUser.initiate;
export const getTokenByEmail = userApi.endpoints.getTokenByEmail.initiate;
