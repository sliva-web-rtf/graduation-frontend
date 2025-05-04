import { baseApi } from '@/shared/api';
import { removeEmptyValues } from '@/shared/lib/helpers/removeEmptyValues';
import { AcademicGroupsDto, AcademicGroupsRequest } from '../model';

const academicProgramsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAcademicGroups: build.query<AcademicGroupsDto, AcademicGroupsRequest>({
            query: (params) => ({
                url: '/academic-groups',
                params: removeEmptyValues(params),
            }),
        }),
    }),
});

export const { useGetAcademicGroupsQuery } = academicProgramsApi;
