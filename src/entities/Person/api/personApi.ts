import { baseApi } from '@/shared/api';
import { Person, PersonRequest } from '../model/types';

const personApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPerson: build.query<Person, PersonRequest>({
            query: ({ id, entity }) => ({
                url: entity === 'student' ? `api/student/${entity}-profile-by-id` : `/api/${entity}/profile-by-id`,
                params: { [`${entity}Id`]: id },
            }),
        }),
    }),
});

export const { useGetPersonQuery } = personApi;
