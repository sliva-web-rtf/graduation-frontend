import { baseApi } from '@/shared/api';
import { toast } from 'react-toastify';
import { TopicRequest } from '../model';

const topicRequestApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        topicRequest: build.mutation<void, TopicRequest>({
            query: (body) => ({
                url: `/topic/add`,
                method: 'POST',
                body,
            }),
            transformResponse: () => {
                toast.success('Заявка успешно отправлен');
            },
            transformErrorResponse: () => {
                toast.error('Не удалось отправить заявку');
            },
        }),
    }),
});

export const { useTopicRequestMutation } = topicRequestApi;
