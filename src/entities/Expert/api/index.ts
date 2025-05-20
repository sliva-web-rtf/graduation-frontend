import { baseApi, TagTypes } from '@/shared/api';
import { removeEmptyValues } from '@/shared/lib/helpers/removeEmptyValues';
import { ExpertsDto, ExpertsModel, ExpertsRequest } from '../model';

const baseParams: ExpertsRequest = {
    page: 0,
    size: 30,
};

export const expertApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getExperts: build.query<ExpertsDto, ExpertsRequest>({
            query: (params) => ({
                url: '/experts',
                params: {
                    ...baseParams,
                    ...removeEmptyValues(params),
                },
            }),
            providesTags: [TagTypes.Experts],
        }),
        getExpertsOptions: build.query<ExpertsModel, ExpertsRequest>({
            query: (params) => ({
                url: '/experts',
                params: {
                    ...baseParams,
                    ...params,
                },
            }),
            transformResponse: (response: ExpertsDto) => response.experts,
            providesTags: [TagTypes.Experts],
        }),
    }),
});

export const { useGetExpertsQuery, useGetExpertsOptionsQuery } = expertApi;
