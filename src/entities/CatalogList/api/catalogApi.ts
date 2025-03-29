import queryString from 'query-string';
import { toast } from 'react-toastify';
import { baseApi } from '@/shared/api';
import { calculatePagesCount } from '@/shared/lib/helpers/calculatePagesCount';
import { catalogActions } from '@/widgets/Catalog/model/slice/catalogSlice';
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
                    toast.error(`Ошибка при получения каталога: ${err}`);
                }
            },
            transformResponse: (response: CatalogDto) => mapCatalogDtoToModel(response),
            providesTags: ['Catalog'],
        }),
    }),
});

export const { useGetCatalogQuery } = catalogApi;
