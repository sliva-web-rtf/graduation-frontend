import { baseApi } from '@/shared/api';
import { Person, PersonRequest } from '../model/types';

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
    }),
});

export const { useGetPersonQuery, useGetSupervisorsQuery } = personApi;
