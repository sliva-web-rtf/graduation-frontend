import { baseApi, TagTypes } from '@/shared/api';
import { CommissionRequest } from '../model';

export const comissionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getComission: build.query<void, CommissionRequest>({
            query: ({ id }) => ({
                url: `/commissions/${id}`,
            }),
            providesTags: (result, error, arg) => [{ type: TagTypes.Commission, id: arg.id }],
        }),
        getComissions: build.query<string[], void>({
            query: () => ({
                url: `/commissions`,
                headers: {
                    year: '2024/2025',
                },
            }),
            transformResponse: (response: { commissions: { name: string }[] }) =>
                response.commissions.map((item) => item.name),
            transformErrorResponse: () => {
                return new Error('Произошла ошибка при получении комиссий');
            },
            providesTags: [TagTypes.Commissions],
        }),
    }),
});

export const { useGetComissionQuery, useGetComissionsQuery } = comissionApi;
