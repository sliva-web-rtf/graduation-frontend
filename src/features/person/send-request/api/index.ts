import { baseApi } from '@/shared/api';
import { toast } from 'react-toastify';
import { PersonRequest } from '../model';

const personRequetsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        sendRequest: build.mutation<void, PersonRequest>({
            query: (body) => ({
                url: `/request`,
                method: 'POST',
                body,
            }),
            transformResponse: () => {
                toast.success('Запрос успешно отправлен');
            },
            transformErrorResponse: () => {
                toast.error('Не удалось отправить запрос');
            },
        }),
    }),
});

export const { useSendRequestMutation } = personRequetsApi;
