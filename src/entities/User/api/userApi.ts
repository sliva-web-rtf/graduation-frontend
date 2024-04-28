import { baseApi } from 'shared/api';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { type Token } from '../../../shared/lib/types/token';
import { type User } from '../model/types/user';
import { type TokenDto, UserDto } from './types';
import { mapTokenDtoToModel } from '../lib/tokenMapper';
import { mapUserDtoToModel } from '../lib/userMapper';
import { Login } from '../model/types/login';
import { loginToDto } from '../lib/loginMapper';

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<User, undefined>({
            query: () => ({
                url: '/api/auth',
            }),
            transformResponse: (response: UserDto) => mapUserDtoToModel(response),
        }),
        getTokenByEmail: build.mutation<Token, Login>({
            query: (initialValues) => ({
                url: '/api/auth',
                method: 'POST',
                body: {
                    ...loginToDto(initialValues),
                    tokenLifetimeInSeconds: 20,
                },
            }),
            transformResponse: async (response: TokenDto) => {
                await UserSecretStorageService.save(response);
                return mapTokenDtoToModel(response);
            },
        }),
    }),
});

export const getUserQuery = userApi.endpoints.getUser.initiate;
export const getTokenByEmail = userApi.endpoints.getTokenByEmail.initiate;
