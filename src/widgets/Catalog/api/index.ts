import { baseApi, TagTypes } from '@/shared/api';
import { catalogActions } from '@/widgets/Catalog';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import { getUrl, mapCatalogDtoToModel, transformDtoForCatalogCard } from '../lib';
import { CatalogDto, CatalogModel, CatalogRequest } from '../model';

const catalogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCatalog: build.query<CatalogModel, CatalogRequest>({
            query: ({ option, params }) =>
                queryString.stringifyUrl({
                    url: getUrl(option),
                    query: params,
                }),
            onQueryStarted: async (arg, api) => {
                const { dispatch, queryFulfilled } = api;
                try {
                    const { data } = await queryFulfilled;
                    dispatch(catalogActions.setPagesCount(data.pagesCount));
                } catch (err: any) {
                    toast.error(`Ошибка при получения каталога: ${err.message}`);
                }
            },
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
