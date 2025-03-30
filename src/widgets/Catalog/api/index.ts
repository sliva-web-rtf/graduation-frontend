import queryString from 'query-string';
import { toast } from 'react-toastify';
import { baseApi, TagTypes } from '@/shared/api';
import { calculatePagesCount } from '@/shared/lib/helpers/calculatePagesCount';
import { catalogActions } from '@/widgets/Catalog';
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
                    const pagesCount = calculatePagesCount(data.length, arg.params.pageSize);
                    dispatch(catalogActions.setPagesCount(pagesCount));
                } catch (err) {
                    toast.error(`Ошибка при получения каталога: ${err}`);
                }
            },
            transformResponse: (response: CatalogDto) => mapCatalogDtoToModel(response),
            providesTags: [TagTypes.Catalog],
        }),
    }),
});

export const { useGetCatalogQuery } = catalogApi;
