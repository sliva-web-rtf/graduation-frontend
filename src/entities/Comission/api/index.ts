import { baseApi, TagTypes } from '@/shared/api';
import { mapCommissionNamesDtoToModel, mapCommissionsDtoToModel } from '../lib/mapCommissionsDtoToModel';
import {
    CommissionNamesDto,
    CommissionNamesModel,
    CommissionRequest,
    CommissionsDto,
    CommissionsModel,
} from '../model';

export const comissionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getComission: build.query<void, CommissionRequest>({
            query: ({ id }) => ({
                url: `/commissions/${id}`,
            }),
            providesTags: (result, error, arg) => [{ type: TagTypes.Commission, id: arg.id }],
        }),
        getCommissionNames: build.query<CommissionNamesModel, void>({
            query: () => ({
                url: `/commissions`,
            }),
            transformResponse: (response: CommissionNamesDto) => mapCommissionNamesDtoToModel(response),
            transformErrorResponse: () => {
                return new Error('Произошла ошибка при получении комиссий');
            },
            providesTags: [TagTypes.Commissions],
        }),
        getCommissions: build.query<CommissionsModel, void>({
            query: () => ({
                url: `/commissions`,
            }),
            transformResponse: (response: CommissionsDto) => mapCommissionsDtoToModel(response),
            transformErrorResponse: () => {
                return new Error('Произошла ошибка при получении комиссий');
            },
            providesTags: [TagTypes.Commissions],
        }),
    }),
});

export const { useGetComissionQuery, useGetCommissionsQuery, useGetCommissionNamesQuery } = comissionApi;
