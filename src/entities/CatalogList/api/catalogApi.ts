import queryString from 'query-string';
import { baseApi } from '@/shared/api';
import { catalogActions } from '@/widgets/Catalog/model/slice/catalogSlice';
import { calculatePagesCount } from '@/shared/lib/helpers/calculatePagesCount';
import { mapCatalogDtoToModel } from '../lib/helpers/catalogMapper';
import { getUrl } from '../lib/helpers/getUrl';
import { CatalogDto } from '../model/types/CatalogDto';
import { CatalogModel } from '../model/types/CatalogModel';
import { CatalogRequest } from '../model/types/CatalogRequest';

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
                    console.error('Ошибка при получения каталога:', err);
                }
            },
            transformResponse: (response: CatalogDto) => mapCatalogDtoToModel(response),
        }),
    }),
});

export const { useGetCatalogQuery } = catalogApi;
