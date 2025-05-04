import { baseApi, TagTypes } from '@/shared/api';
import { mapCommissionNamesDtoToModel, mapCommissionsDtoToModel } from '../lib/mapCommissionsDtoToModel';
import { CommissionNamesDto, CommissionNamesModel, CommissionsDto, CommissionsModel } from '../model';

export const comissionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
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
                url: `/commissions/for-editing`,
            }),
            transformResponse: (response: CommissionsDto) => mapCommissionsDtoToModel(response),
            transformErrorResponse: () => {
                return new Error('Произошла ошибка при получении комиссий');
            },
            providesTags: [TagTypes.Commissions],
        }),
    }),
});

export const { useGetCommissionsQuery, useGetCommissionNamesQuery } = comissionApi;
