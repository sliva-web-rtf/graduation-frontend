import { baseApi } from '@/shared/api';
import { StudentScientificFormSchema } from '../model/types/studentScientificFormSchema';
import { ProfessorScientificFormSchema } from '../model/types/professorScientificFormSchema';

const scientificPortfolioApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStudentScientificPortfolio: build.query<StudentScientificFormSchema, void>({
            query: () => ({
                url: '/api/student/student-scientific-portfolio',
            }),
        }),
        getProfessorScientificPortfolio: build.query<ProfessorScientificFormSchema, void>({
            query: () => ({
                url: '/api/professor/professor-scientific-portfolio',
            }),
        }),
    }),
});

export const {
    useGetStudentScientificPortfolioQuery: getStudentScientificPortfolio,
    useGetProfessorScientificPortfolioQuery: getProfessorScientificPortfolio,
} = scientificPortfolioApi;
