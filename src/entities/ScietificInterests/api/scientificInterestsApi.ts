import { baseApi } from '@/shared/api';

const scientificInterestsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getScientificInterests: build.query<string[], void>({
            query: () => '/api/infrastructure/list-scientific-interests',
        }),
    }),
});

export const getScientificInterests = scientificInterestsApi.useGetScientificInterestsQuery;
