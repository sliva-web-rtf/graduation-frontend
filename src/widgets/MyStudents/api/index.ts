import { baseApi, TagTypes } from '@/shared/api';
import { removeEmptyValues } from '@/shared/lib/helpers/removeEmptyValues';
import { mapStudentsTableDtoToModel } from '../lib';
import {
    EditStudentRowDto,
    SetDefenceRequest,
    StudentsTableDto,
    StudentsTableModel,
    StudentsTableRequest,
} from '../model';

export const studentsTableApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStudentsTable: build.query<StudentsTableModel, StudentsTableRequest>({
            query: (params) => ({
                url: '/students/table',
                params: removeEmptyValues(params),
            }),
            transformResponse: (response: StudentsTableDto, _: unknown, arg: StudentsTableRequest) => {
                const { page, size } = arg;
                return mapStudentsTableDtoToModel(response, page, size);
            },
            providesTags: (result, error, arg) => {
                if (!result) {
                    return [TagTypes.MyStudents];
                }

                return [...result.students.map(({ id }) => ({ type: TagTypes.MyStudents, id })), TagTypes.MyStudents];
            },
        }),
        editStudentRow: build.mutation<{ studentId: string }, EditStudentRowDto>({
            query: (body) => ({
                url: '/students/table',
                method: 'PUT',
                body,
            }),
        }),
        setDefence: build.mutation<void, SetDefenceRequest>({
            query: (body) => ({
                url: '/students/table/date',
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, arg) => arg.studentIds.map((id) => ({ type: TagTypes.MyStudents, id })),
        }),
    }),
});

export const { useGetStudentsTableQuery, useEditStudentRowMutation, useSetDefenceMutation } = studentsTableApi;
