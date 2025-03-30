import { toast } from 'react-toastify';
import { baseApi, TagTypes } from '@/shared/api';
import { ScientificWorkRequest } from '../models/types/scientificWorkRequest';

const newScientificWorkApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addNewScientificWork: build.mutation<void, ScientificWorkRequest>({
            query: (data) => ({
                url: '/api/scientificWork/create-scientific-work',
                method: 'POST',
                body: {
                    ...data,
                },
            }),
            transformResponse: () => {
                toast.success('Тема исследования успешно предложена');
            },
            invalidatesTags: [TagTypes.Catalog],
        }),
    }),
});

export const { useAddNewScientificWorkMutation } = newScientificWorkApi;
