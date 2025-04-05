import { ICatalogCard } from '@/entities/CatalogCard';
import { TopicCardModel } from '@/entities/Topic';
import { baseApi } from '@/shared/api';
import { transformDtoForCatalogCard } from '@/widgets/Catalog';

const topicApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMyTopics: build.query<Omit<ICatalogCard, 'option'>[], void>({
            query: () => ({
                url: 'topics/my-topics',
            }),
            transformResponse: (response: TopicCardModel[]) => response?.map(transformDtoForCatalogCard),
        }),
    }),
});

export const { useGetMyTopicsQuery } = topicApi;
