import { baseApi, TagTypes } from '@/shared/api';
import { mapCommissionNamesDtoToModel, mapCommissionsDtoToModel } from '../lib/mapCommissionsDtoToModel';
import { CommissionNamesDto, CommissionNamesModel, CommissionsDto, CommissionsModel } from '../model';

const provideTags = (result?: CommissionNamesModel | CommissionsModel) => {
    if (!result) {
        return [];
    }

    return [...result.map((commission) => ({ type: TagTypes.Commission, id: commission.id })), TagTypes.Commissions];
};

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
            providesTags: (result) => provideTags(result),
        }),
        getCommissions: build.query<CommissionsModel, void>({
            query: () => ({
                url: `/commissions/for-editing`,
            }),
            transformResponse: (response: CommissionsDto) => mapCommissionsDtoToModel(response),
            transformErrorResponse: () => {
                return new Error('Произошла ошибка при получении комиссий');
            },
            providesTags: (result) => provideTags(result),
        }),
    }),
});

export const { useGetCommissionsQuery, useGetCommissionNamesQuery } = comissionApi;
