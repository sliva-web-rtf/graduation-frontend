import { baseApi } from '@/shared/api';
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
        getUsersScientificWorks: build.query<TopicCardModel[], UsersScientificWorksRequest>({
            query: ({ userId }) => ({
                url: '/api/scientificWork/scientific-work-by-user-id',
                params: { userId },
            }),
        }),
    }),
});

export const { useGetScientificWorkQuery, useGetUsersScientificWorksQuery } = topicApi;
