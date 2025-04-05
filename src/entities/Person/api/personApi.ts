import { baseApi } from '@/shared/api';
import { Person, PersonRequest } from '../model/types';

const personApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPerson: build.query<Person, PersonRequest>({
            query: ({ id, isStudent }) => ({
                url: isStudent ? `/students/${id}` : `/supervisors/${id}`,
            }),
        }),
    }),
});

export const { useGetPersonQuery } = personApi;
