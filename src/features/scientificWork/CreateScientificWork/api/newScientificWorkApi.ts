import { baseApi } from 'shared/api';
import { toast } from 'react-toastify';
import { ScientificWorkRequest } from '../models/types/scientificWorkRequest';

const newScientificWorkApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addNewScientificWork: build.mutation<void, ScientificWorkRequest>({
            query: (data) => ({
                url: '/api/scientificWork/create-scientific-work',
                method: 'POST',
                body: data,
            }),
            transformResponse: () => {
                toast.success('Тема исследования успешно предложена');
            },
        }),
    }),
});

export const { useAddNewScientificWorkMutation } = newScientificWorkApi;
