import { toast } from 'react-toastify';
import { baseApi } from '@/shared/api';
import { getParamsByOption } from '@/features/entity/AddRequests/model/lib/helpers/getParamsByOption';
import { ToggleEnum } from '@/features/entity/AddRequests/model/types/toggleEnum';
import { AddToFavoritesRequest } from '../model/types/addToFavoritesRequest';
import { AddProfessorRequest } from '../model/types/addProfessorRequest';
import { AddStudentRequest } from '../model/types/addStudentRequest';

const addRequestsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addToFavorites: build.mutation<void, AddToFavoritesRequest>({
            query: ({ id, isProfessor, option, isFavorite }) => {
                const parentEndpoint = isProfessor ? 'professor' : 'student';
                const { endpoint, param } = getParamsByOption(option);

                return {
                    url: `/api/${parentEndpoint}/${endpoint}`,
                    method: 'POST',
                    params: {
                        [`${param}`]: id,
                        toggleEnum: isFavorite ? ToggleEnum.Deactivate : ToggleEnum.Activate,
                    },
                };
            },
        }),
        addProfessor: build.mutation<void, AddProfessorRequest>({
            query: (body) => ({
                url: `/api/request/to-or-from-professor`,
                method: 'POST',
                body,
            }),
            transformResponse: () => {
                toast.success('Запрос успешно отправлен');
            },
        }),
        addStudent: build.mutation<void, AddStudentRequest>({
            query: (body) => ({
                url: `/api/request/to-student`,
                method: 'POST',
                body,
            }),
            transformResponse: () => {
                toast.success('Запрос успешно отправлен');
            },
        }),
    }),
});

export const { useAddToFavoritesMutation, useAddProfessorMutation, useAddStudentMutation } = addRequestsApi;
