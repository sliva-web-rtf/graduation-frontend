import { Role } from '@/entities/User';
import { baseApi, isApiError } from '@/shared/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { CreatePersonRequest, Person, PersonRequest } from '../model/types';

const personApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPerson: build.query<Person, PersonRequest>({
            query: ({ id, isStudent }) => ({
                url: isStudent ? `/students/${id}` : `/supervisors/${id}`,
            }),
        }),
        getSupervisors: build.query<{ label: string; value: string }[], void>({
            query: () => ({
                url: '/supervisors',
                params: {
                    page: 0,
                    size: 1000,
                },
            }),
            transformResponse: (response: { supervisors: Person[] }) =>
                response.supervisors
                    .map((item) => ({ label: item.fullName, value: item.id }))
                    // TODO: сортировка с сервера?
                    .sort((a, b) => a.label.localeCompare(b.label)),
        }),
        createPerson: build.mutation<void, CreatePersonRequest>({
            query: (body) => ({
                url: body.role.includes(Role.Student) ? `/students` : `/supervisors`,
                method: 'POST',
                body,
            }),
            transformErrorResponse: (error: FetchBaseQueryError) => {
                if (isApiError(error)) {
                    return new Error(error.data.title);
                }

                return new Error('Произошла ошибка при создании пользователя');
            },
        }),
    }),
});

export const { useGetPersonQuery, useGetSupervisorsQuery, useCreatePersonMutation } = personApi;
