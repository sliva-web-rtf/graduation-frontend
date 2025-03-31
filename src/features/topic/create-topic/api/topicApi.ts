import { baseApi, TagTypes } from '@/shared/api';
import { toast } from 'react-toastify';
import { CreateTopicRequest } from '../models/types/scientificWorkRequest';

const topicApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createTopic: build.mutation<void, CreateTopicRequest>({
            query: (data) => ({
                url: '/topics',
                method: 'POST',
                body: data,
            }),
            transformResponse: () => {
                toast.success('Тема исследования успешно предложена');
            },
            invalidatesTags: [TagTypes.Catalog],
        }),
    }),
});

export const { useCreateTopicMutation } = topicApi;
