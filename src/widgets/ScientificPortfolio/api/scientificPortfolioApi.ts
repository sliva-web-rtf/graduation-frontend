import { transformScientificAreaFromDto } from '@/entities/ScientificAreas/lib/scientificAreasMapper';
import { baseApi } from '@/shared/api';
import { ProfessorScientificFormSchema } from '../model/types/professorScientificFormSchema';
import { StudentScientificFormSchema } from '../model/types/studentScientificFormSchema';

const scientificPortfolioApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStudentScientificPortfolio: build.query<StudentScientificFormSchema, void>({
            query: () => ({
                url: '/api/student/student-scientific-portfolio',
            }),
            transformResponse: (response: any) => ({
                ...response,
                scientificArea: transformScientificAreaFromDto(response?.scientificArea),
            }),
        }),
        getProfessorScientificPortfolio: build.query<ProfessorScientificFormSchema, void>({
            query: () => ({
                url: '/api/professor/professor-scientific-portfolio',
            }),
            transformResponse: (response: any) => ({
                ...response,
                scientificArea: transformScientificAreaFromDto(response?.scientificArea),
            }),
        }),
    }),
});

export const { useGetStudentScientificPortfolioQuery, useGetProfessorScientificPortfolioQuery } =
    scientificPortfolioApi;
