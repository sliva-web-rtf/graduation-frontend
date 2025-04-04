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
        getScientificWork: build.query<Topic, ScientificWorksRequest>({
            query: ({ id }) => `topics/${id}`,
            transformResponse: (response: ScientificWorkDto) => mapScientificWorkDtoToModel(response),
        }),
        getUsersScientificWorks: build.query<Omit<ICatalogCard, 'option'>[], UsersScientificWorksRequest>({
            query: ({ userId }) => ({
                url: 'topics/topics-by-user-id',
                params: { userId },
            }),
            transformResponse: (response: TopicCardModel[]) => response?.map(transformDtoForCatalogCard),
        }),
    }),
});

export const { useGetScientificWorkQuery, useGetUsersScientificWorksQuery } = topicApi;
