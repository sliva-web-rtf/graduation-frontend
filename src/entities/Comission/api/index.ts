import { baseApi, TagTypes } from '@/shared/api';
import { OptionType } from '@/shared/ui';
import { mapCommissionNamesDtoToModel, mapCommissionsDtoToModel } from '../lib/mapCommissionsDtoToModel';
import { transformCommissionsToOptions } from '../lib/transformCommissionsToOptions';
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
        getCommissionsForEditing: build.query<CommissionsModel, void>({
            query: () => ({
                url: `/commissions/for-editing`,
            }),
            transformResponse: (response: CommissionsDto) => mapCommissionsDtoToModel(response),
            transformErrorResponse: () => {
                return new Error('Произошла ошибка при получении комиссий');
            },
            providesTags: (result) => provideTags(result),
        }),
        getCommissionsOptions: build.query<OptionType[], void>({
            query: () => ({
                url: `/commissions`,
            }),
            transformResponse: (response: CommissionsDto) => transformCommissionsToOptions(response.commissions),
            transformErrorResponse: () => {
                return new Error('Произошла ошибка при получении комиссий');
            },
            providesTags: (result) => {
                if (!result) {
                    return [];
                }

                return [
                    ...result.map((option) => ({ type: TagTypes.Commission, id: option.value })),
                    TagTypes.Commissions,
                ];
            },
        }),
    }),
});

export const { useGetCommissionsOptionsQuery, useGetCommissionsForEditingQuery, useGetCommissionNamesQuery } =
    comissionApi;
