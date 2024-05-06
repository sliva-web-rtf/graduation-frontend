import { baseApi } from 'shared/api';
import { ScientificWork } from 'entities/ScientificWork';
import { UsersScientificWorksModel } from '../model/types/usersScientificWorksModel';
import { UsersScientificWorksRequest } from '../model/types/usersScientificWorksRequest';
import { ScientificWorksRequest } from '../model/types/scientificWorksRequest';

const scientificWorkApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        geScientificWork: build.query<ScientificWork, ScientificWorksRequest>({
            query: ({ id }) => ({
                url: '/api/scientificWork/general-info-by-id',
                params: { id },
            }),
        }),
        getUsersScientificWorks: build.query<UsersScientificWorksModel, UsersScientificWorksRequest>({
            query: ({ userId }) => ({
                url: '/api/scientificWork/scientific-work-by-user-id',
                params: { userId },
            }),
        }),
    }),
});

export const { useGeScientificWorkQuery, useGetUsersScientificWorksQuery } = scientificWorkApi;
