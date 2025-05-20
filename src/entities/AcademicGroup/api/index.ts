import { baseApi, TagTypes } from '@/shared/api';
import { removeEmptyValues } from '@/shared/lib/helpers/removeEmptyValues';
import { AcademicGroupsDto, AcademicGroupsRequest } from '../model';

const academicProgramsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAcademicGroups: build.query<AcademicGroupsDto, AcademicGroupsRequest>({
            query: (params) => ({
                url: '/academic-groups',
                params: removeEmptyValues(params),
            }),
            providesTags: (result) => {
                if (!result) {
                    return [];
                }

                return [
                    ...result.academicGroups.map((group) => ({ type: TagTypes.AcademicGroup, id: group.id })),
                    TagTypes.AcademicGroups,
                ];
            },
        }),
    }),
});

export const { useGetAcademicGroupsQuery } = academicProgramsApi;
