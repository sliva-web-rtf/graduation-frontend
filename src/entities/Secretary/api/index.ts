import { baseApi } from '@/shared/api';
import { SecretariesDto, SecretariesModel, SecretariesRequest } from '../model';

const baseParams: SecretariesRequest = {
    page: 0,
    size: 30,
};

export const secretaryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSecretaries: build.query<SecretariesModel, SecretariesRequest>({
            query: (params) => ({
                url: '/secretaries',
                params: {
                    ...baseParams,
                    ...params,
                },
            }),
            transformResponse: (response: SecretariesDto) => response.secretaries,
        }),
    }),
});

export const { useGetSecretariesQuery } = secretaryApi;
