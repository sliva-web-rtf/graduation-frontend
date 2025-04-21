import { ICatalogCard } from '@/entities/CatalogCard';
import { baseApi } from '@/shared/api';
import { transformDtoForCatalogCard } from '@/widgets/Catalog';
import { mapScientificWorkDtoToModel } from '../lib';
import {
    ScientificWorkDto,
    ScientificWorksRequest,
    Topic,
    TopicCardModel,
    UsersScientificWorksRequest,
} from '../model/types';

const topicApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTopic: build.query<Topic, ScientificWorksRequest>({
            query: ({ id }) => `topics/${id}`,
            transformResponse: (response: ScientificWorkDto) => mapScientificWorkDtoToModel(response),
        }),
        getUsersTopics: build.query<Omit<ICatalogCard, 'option'>[], UsersScientificWorksRequest>({
            query: ({ userId }) => ({
                url: `topics/by-user/${userId}`,
                params: {
                    size: 1000,
                    page: 0,
                },
            }),
            transformResponse: (response: { topics: TopicCardModel[] }) =>
                response?.topics?.map(transformDtoForCatalogCard),
        }),
    }),
});

export const { useGetTopicQuery, useGetUsersTopicsQuery } = topicApi;
