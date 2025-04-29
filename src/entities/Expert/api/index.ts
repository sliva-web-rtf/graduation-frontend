import { baseApi } from '@/shared/api';
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
                    ...params,
                },
            }),
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
        }),
    }),
});

export const { useGetExpertsQuery, useGetExpertsOptionsQuery } = expertApi;
