import { baseApi } from '@/shared/api';
import { ScientificInterestsDto } from '@/features/catalog/Search/api/types';

const searchApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getScientificInterests: build.query<ScientificInterestsDto, string>({
            query: (search) => ({
                url: '/api/infrastructure/list-scientific-interests',
                params: {
                    page: 1,
                    pageSize: 30,
                    search: search.length ? search : undefined,
                },
            }),
        }),
    }),
});

export const { useGetScientificInterestsQuery } = searchApi;
