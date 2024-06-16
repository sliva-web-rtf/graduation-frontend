import { baseApi } from '@/shared/api';

const professorEducationLevelApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProfessorEducationLevels: build.query<string[], void>({
            query: () => '/api/infrastructure/list-professor-degree',
        }),
    }),
});

export const getProfessorEducationLevels = professorEducationLevelApi.useGetProfessorEducationLevelsQuery;
