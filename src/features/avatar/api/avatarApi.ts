import { baseApi, isApiError } from '@/shared/api';
import { AppError } from '@/shared/lib/types/appError';
import { mapAvatarToDto } from '../lib/uploadAvatarMapper';
import { GetAvatarDto } from './types';

const DEFAULT_UPLOAD_AVATAR_ERROR_TEXT = 'Произошла ошибка при загрузке аватара.';
const DEFAULT_DELETE_AVATAR_ERROR_TEXT = 'Произошла ошибка при удалении аватара.';
const DEFAULT_GET_AVATAR_ERROR_TEXT = 'Произошла ошибка при получении аватара.';

// TODO: сделать middleware для обработки ошибок.
const userAvatarApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        uploadUserAvatar: build.mutation<void, File>({
            query: (UploadAvatarFile) => ({
                method: 'POST',
                url: '/api/users/add-avatar-image',
                body: mapAvatarToDto(UploadAvatarFile),
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Avatar']),
            transformErrorResponse: (error: unknown) => {
                if (isApiError(error)) {
                    return new AppError(error.data?.title ?? DEFAULT_UPLOAD_AVATAR_ERROR_TEXT);
                }

                return new AppError(DEFAULT_UPLOAD_AVATAR_ERROR_TEXT);
            },
        }),
        getUserAvatar: build.query<string, void>({
            query: () => ({
                url: '/api/users/get-avatar-image',
            }),
            providesTags: ['Avatar'],
            transformResponse: (response: GetAvatarDto) => {
                if (response.avatarImagePath && response.avatarImagePath !== '') {
                    return `${__API__}${response.avatarImagePath}`;
                }
                return '';
            },
            transformErrorResponse: (error: unknown) => {
                if (isApiError(error)) {
                    return new AppError(error.data?.title ?? DEFAULT_GET_AVATAR_ERROR_TEXT);
                }

                return new AppError(DEFAULT_GET_AVATAR_ERROR_TEXT);
            },
        }),
        deleteUserAvatar: build.mutation<void, void>({
            query: () => ({
                method: 'DELETE',
                url: '/api/users/remove-avatar-image',
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Avatar']),
            transformErrorResponse: (error: unknown) => {
                if (isApiError(error)) {
                    return new AppError(error.data?.title ?? DEFAULT_DELETE_AVATAR_ERROR_TEXT);
                }

                return new AppError(DEFAULT_DELETE_AVATAR_ERROR_TEXT);
            },
        }),
    }),
});

export const useUploadAvatar = userAvatarApi.useUploadUserAvatarMutation;
export const useGetAvatar = userAvatarApi.useGetUserAvatarQuery;
export const useDeleteAvatar = userAvatarApi.useDeleteUserAvatarMutation;
