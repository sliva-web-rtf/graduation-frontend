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
        getComissions: build.query<[], void>({
            query: () => ({
                url: `/commissions`,
            }),
            transformErrorResponse: () => {
                return new Error('Произошла ошибка при получении комиссий');
            },
            providesTags: [TagTypes.Commissions],
        }),
    }),
});

export const { useGetComissionQuery, useGetComissionsQuery } = comissionApi;
