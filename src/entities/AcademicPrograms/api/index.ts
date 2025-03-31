import { baseApi } from '@/shared/api';

type Dto = { academicPrograms: string[] };
type Model = string[];

const academicProgramsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAcademicPrograms: build.query<Model, void>({
            query: () => '/topics/academic-programs',
            transformResponse: (response: Dto) => response.academicPrograms,
        }),
    }),
});

export const { useGetAcademicProgramsQuery } = academicProgramsApi;
