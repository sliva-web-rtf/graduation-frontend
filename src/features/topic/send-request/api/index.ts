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
                toast.info('Раздел находится в разработке, оформить заявку не получится');
            },
        }),
    }),
});

export const { useTopicRequestMutation } = topicRequestApi;
