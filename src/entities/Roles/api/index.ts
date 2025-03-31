import { baseApi } from '@/shared/api';

type Dto = { qualificationWorkRoles: string[] };
type Model = string[];

const topicRolesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTopicRoles: build.query<Model, void>({
            query: () => 'topics/qualification-work-roles',
            transformResponse: (response: Dto) => response.qualificationWorkRoles,
        }),
    }),
});

export const { useGetTopicRolesQuery } = topicRolesApi;
