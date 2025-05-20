import { baseApi, isApiError, TagTypes } from '@/shared/api';
import { removeEmptyValues } from '@/shared/lib/helpers/removeEmptyValues';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import queryString from 'query-string';
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
            query: ({ sort, ...params }) => ({
                url: queryString.stringifyUrl({
                    url: '/students/table',
                    query: removeEmptyValues(params),
                }),
                method: 'POST',
                body: sort,
            }),
            transformResponse: (response: StudentsTableDto, _: unknown, arg: StudentsTableRequest) => {
                const { page, size } = arg;
                return mapStudentsTableDtoToModel(response, page, size);
            },
            transformErrorResponse: (error: any) => {
                if (error?.data?.title) {
                    return new Error(error?.title);
                }

                return new Error('Произошла ошибка при получении таблицы студентов');
            },
            providesTags: (result) =>
                result ? result.students.map(({ id }) => ({ type: TagTypes.MyStudents, id })) : [],
        }),
        editStudentRow: build.mutation<{ studentId: string }, EditStudentRowDto>({
            query: (body) => ({
                url: '/students/table',
                method: 'PUT',
                body,
            }),
            transformErrorResponse: (error: FetchBaseQueryError) => {
                const defaultMessage = 'Произошла ошибка при изменении ячейки';

                if (isApiError(error)) {
                    return new Error(error.data.title || defaultMessage);
                }

                return new Error(defaultMessage);
            },
            invalidatesTags: (result) => (result ? [{ type: TagTypes.MyStudents, id: result.studentId }] : []),
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
