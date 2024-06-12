import { baseApi } from '@/shared/api';
import { Professor } from '../model/types/professor';
import { ProfessorRequest } from '../model/types/professorRequest';

const professorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProfessor: build.query<Professor, ProfessorRequest>({
            query: ({ id }) => ({
                url: '/api/professor/profile-by-id',
                params: {
                    professorId: id,
                },
            }),
        }),
    }),
});

export const { useGetProfessorQuery } = professorApi;
