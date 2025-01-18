import { url } from 'inspector';
import { baseApi } from '@/shared/api';
import { UserSecretStorageService } from '@/shared/lib/helpers/userSecretStorage';
import { type Token } from '../../../shared/lib/types/token';
import { type User } from '../model/types/user';
import { type TokenDto, UserDto } from './types';
import { mapTokenDtoToModel } from '../lib/tokenMapper';
import { mapUserDtoToModel } from '../lib/userMapper';
import { Login } from '../model/types/login';
import { loginToDto } from '../lib/loginMapper';
import { Signup } from '../model/types/signup';
import { ConfirmEmail, RepeatConfirmEmailProfessor, RepeatConfirmEmailStudent } from '../model/types/confirmEmail';

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
                },
            }),
            transformResponse: async (response: TokenDto) => {
                await UserSecretStorageService.save(response);
                return mapTokenDtoToModel(response);
            },
        }),
        refreshToken: build.mutation<Token, Token>({
            query: (token) => ({
                url: '/api/auth',
                method: 'PUT',
                body: {
                    refreshToken: token.refreshToken,
                },
            }),
            transformResponse: async (response: TokenDto) => {
                await UserSecretStorageService.save(response);
                return mapTokenDtoToModel(response);
            },
        }),
        signupUser: build.mutation<{ userId: string }, Signup>({
            query: (initialValues) => {
                const { role, email, password } = initialValues;
                return {
                    url: `/api/auth/create-${role}`,
                    method: 'POST',
                    body: {
                        email,
                        password,
                    },
                };
            },
        }),
        confirmEmail: build.mutation<{ succeeded: boolean }, ConfirmEmail>({
            query: (initialValues) => {
                const { userId, confirmCode, role } = initialValues;
                return { url: `/api/users/${role}-confirm-email`, method: 'PATCH', body: { userId, confirmCode } };
            },
        }),
        repeatConfirmEmailStudent: build.mutation<{ succeeded: boolean }, RepeatConfirmEmailStudent>({
            query: (initialValues) => ({
                url: `/api/users/repeat-send-email-with-confirm-code-student`,
                method: 'PUT',
                body: initialValues,
            }),
        }),
        repeatConfirmEmailProfessor: build.mutation<{ succeeded: boolean }, RepeatConfirmEmailProfessor>({
            query: (initialValues) => ({
                url: `/api/users/repeat-send-email-with-confirm-code-professor`,
                method: 'PUT',
                body: initialValues,
            }),
        }),
    }),
});

export const getUserQuery = userApi.endpoints.getUser.initiate;
export const refreshToken = userApi.useRefreshTokenMutation;
export const getTokenByEmail = userApi.endpoints.getTokenByEmail.initiate;
export const {
    useSignupUserMutation,
    useConfirmEmailMutation,
    useRepeatConfirmEmailStudentMutation,
    useRepeatConfirmEmailProfessorMutation,
} = userApi;
