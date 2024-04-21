import { baseApi } from 'shared/api';
import { mapCatalogDtoToModel } from 'widgets/Catalog/lib/helpers/catalogMapper';
import { getUrl } from '../lib/helpers/getUrl';
import { CatalogDto, CatalogModel, CatalogRequest } from './types';

const catalogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCatalog: build.query<CatalogModel, CatalogRequest>({
            query: ({ params, option }) => {
                const url = getUrl(option);
                return { url, params };
            },
            transformResponse: (response: CatalogDto) => mapCatalogDtoToModel(response),
        }),
    }),
});

export const { useGetCatalogQuery } = catalogApi;
