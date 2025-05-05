import { baseApi, isApiError, TagTypes } from '@/shared/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const commissionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        deleteCommission: build.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/commissions/${id}`,
                method: 'DELETE',
            }),
            transformErrorResponse: (error: FetchBaseQueryError) => {
                if (isApiError(error)) {
                    return new Error(error.data.title);
                }

                return new Error('Произошла ошибка при удалении комиссии');
            },
            invalidatesTags: (result) => (result ? [TagTypes.Commissions] : []),
        }),
    }),
});

export const { useDeleteCommissionMutation } = commissionApi;
