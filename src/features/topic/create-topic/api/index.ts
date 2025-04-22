import { baseApi, TagTypes } from '@/shared/api';
import { toast } from 'react-toastify';
import { CreateTopicRequest } from '../models/types/CreateTopicRequest';
import { CreateTopicResponse } from '../models/types/CreateTopicResponse';

const topicApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createTopic: build.mutation<CreateTopicResponse, CreateTopicRequest>({
            query: (data) => ({
                url: '/topics',
                method: 'POST',
                body: data,
            }),
            transformErrorResponse: () => {
                toast.error('Ошибка при создании темы ВКР');
            },
            invalidatesTags: (result) => (result ? [TagTypes.MyTopics] : []),
        }),
    }),
});

export const { useCreateTopicMutation } = topicApi;
