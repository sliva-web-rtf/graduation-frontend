import { baseApi } from '@/shared/api';
import { removeEmptyValues } from '@/shared/lib/helpers/removeEmptyValues';
import { StudentRequest, StudentsDto } from '../model';

const studentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStudents: build.query<StudentsDto, StudentRequest>({
            query: (params) => ({
                url: '/commissions/students',
                params: removeEmptyValues(params),
            }),
        }),
    }),
});

export const { useGetStudentsQuery } = studentApi;
