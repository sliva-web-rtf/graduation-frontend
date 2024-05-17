import { baseApi, isApiError } from 'shared/api';
import { AppError } from 'shared/lib/types/appError';
import { mapAvatarToDto } from '../lib/uploadAvatarMapper';
import { GetAvatarDto } from './types';

const DEFAULT_UPLOAD_AVATAR_ERROR_TEXT = 'Произошла ошибка при загрузке аватара.';

const userAvatarApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        uploadUserAvatar: build.mutation<undefined, File>({
            query: (UploadAvatarFile) => ({
                method: 'POST',
                url: '/api/users/add-avatar-image',
                body: mapAvatarToDto(UploadAvatarFile),
            }),
            invalidatesTags: ['Avatar'],
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
        }),
    }),
});

export const useUploadAvatar = userAvatarApi.useUploadUserAvatarMutation;
export const useGetAvatar = userAvatarApi.useGetUserAvatarQuery;
