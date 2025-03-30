import { baseApi } from '@/shared/api';
import { mapScientificWorkDtoToModel } from '../lib';
import {
    ScientificWorkDto,
    ScientificWorksRequest,
    Topic,
    TopicCardModel,
    UsersScientificWorksRequest,
} from '../model/types';

const scientificWorkApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getScientificWork: build.query<Topic, ScientificWorksRequest>({
            query: ({ id }) => ({
                url: '/api/scientificWork/general-info-by-id',
                params: { id },
            }),
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

export const { useGetScientificWorkQuery, useGetUsersScientificWorksQuery } = scientificWorkApi;
