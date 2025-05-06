import { baseApi, TagTypes } from '@/shared/api';
import { removeEmptyValues } from '@/shared/lib/helpers/removeEmptyValues';
import queryString from 'query-string';
import { StudentsDto, StudentsRequest } from '../model';

const studentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStudents: build.query<StudentsDto, StudentsRequest>({
            query: (params) =>
                queryString.stringifyUrl({
                    url: '/commissions/students',
                    query: removeEmptyValues(params),
                }),
            providesTags: [TagTypes.CommissionStudents],
        }),
    }),
});

export const { useGetStudentsQuery, useLazyGetStudentsQuery } = studentApi;
