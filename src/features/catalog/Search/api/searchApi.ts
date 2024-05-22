import { baseApi } from 'shared/api';
import { ScientificAreas, ScientificAreasModel, ScientificInterestsDto } from 'features/catalog/Search/api/types';
import { transformDtoForAutocomplete } from '../lib/helpers/transformDataForAutocomplete';

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
        getScientificAreas: build.query<ScientificAreasModel, void>({
            query: () => '/api/infrastructure/list-scientific-area',
            transformResponse: (response: ScientificAreas) => transformDtoForAutocomplete(response),
        }),
    }),
});

export const { useGetScientificInterestsQuery, useGetScientificAreasQuery } = searchApi;
