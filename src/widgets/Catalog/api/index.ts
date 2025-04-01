import { baseApi, TagTypes } from '@/shared/api';
import { catalogActions } from '@/widgets/Catalog';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import { getUrl, mapCatalogDtoToModel } from '../lib';
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
                } catch (err) {
                    toast.error(`Ошибка при получения каталога: ${err.message}`);
                }
            },
            transformResponse: (response: CatalogDto) => mapCatalogDtoToModel(response),
            providesTags: [TagTypes.Catalog],
        }),
    }),
});

export const { useGetCatalogQuery } = catalogApi;
