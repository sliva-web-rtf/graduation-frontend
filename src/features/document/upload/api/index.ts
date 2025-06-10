import { baseApi, isApiError } from '@/shared/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const documentUploadApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        uploadDocument: build.mutation<void, File>({
            query: (body) => ({
                url: '/documents/upload',
                method: 'POST',
                body,
            }),

            transformErrorResponse: (error: FetchBaseQueryError) => {
                if (isApiError(error)) {
                    return new Error(error.data.title);
                }

                return new Error('Произошла ошибка при загрузке файла');
            },
        }),
    }),
});

export const { useUploadDocumentMutation } = documentUploadApi;
