import { baseApi } from '@/shared/api';
import { AcademicGroupsDto, AcademicGroupsRequest } from '../model';

const academicProgramsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAcademicGroups: build.query<AcademicGroupsDto, AcademicGroupsRequest>({
            query: (params) => ({
                url: '/academic-groups',
                params,
            }),
        }),
    }),
});

export const { useGetAcademicGroupsQuery } = academicProgramsApi;
