import { baseApi } from '@/shared/api';
import { ScientificArea } from '../model/types';
import { transformScientificAreaFromDto } from '../lib/scientificAreasMapper';

const scientificAreaApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getScientificAreas: build.query<ScientificArea[], void>({
            query: () => '/api/infrastructure/list-scientific-area',
            transformResponse: (response: ScientificAreaDto[]) => transformScientificAreaFromDto(response),
        }),
    }),
});

export const getScientificAreas = scientificAreaApi.useGetScientificAreasQuery;
