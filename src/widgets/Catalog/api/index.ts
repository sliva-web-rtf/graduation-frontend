import { baseApi, TagTypes } from '@/shared/api';
import { removeEmptyValues } from '@/shared/lib/helpers/removeEmptyValues';
import queryString from 'query-string';
import { getUrl, mapCatalogDtoToModel, transformDtoForCatalogCard } from '../lib';
import { CatalogDto, CatalogModel, CatalogRequest } from '../model';

const catalogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCatalog: build.query<CatalogModel, CatalogRequest>({
            query: ({ option, params }) =>
                queryString.stringifyUrl({
                    url: getUrl(option),
                    query: removeEmptyValues(params),
                }),
            transformResponse: (response: CatalogDto) => {
                const { data, pagesCount } = mapCatalogDtoToModel(response);
                return {
                    data: data?.map(transformDtoForCatalogCard),
                    pagesCount,
                };
            },
            providesTags: [TagTypes.Catalog],
        }),
    }),
});

export const { useGetCatalogQuery } = catalogApi;
