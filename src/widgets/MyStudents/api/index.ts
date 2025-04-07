import { baseApi } from '@/shared/api';
import { removeEmptyValues } from '@/shared/lib/helpers/removeEmptyValues';
import { mapStudentsTableDtoToModel } from '../lib';
import { StudentsTableDto, StudentsTableModel, StudentsTableRequest } from '../model';

export const studentsTableApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStudentsTable: build.query<StudentsTableModel, StudentsTableRequest>({
            query: (params) => ({
                url: '/students/table',
                params: removeEmptyValues(params),
            }),
            transformResponse: (response: StudentsTableDto) => mapStudentsTableDtoToModel(response),
        }),
    }),
});

export const { useGetStudentsTableQuery } = studentsTableApi;
