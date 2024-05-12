import { baseApi } from 'shared/api';
import { getParamsByOption } from 'features/entity/AddRequests/model/lib/helpers/getParamsByOption';
import { toast } from 'react-toastify';
import { AddToFavoritesRequest } from '../model/types/addToFavoritesRequest';
import { AddProfessorRequest } from '../model/types/addProfessorRequest';
import { AddStudentRequest } from '../model/types/addStudentRequest';

const addRequestsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addToFavorites: build.mutation<void, AddToFavoritesRequest>({
            query: ({ id, isProfessor, option }) => {
                const parentEndpoint = isProfessor ? 'professor' : 'student';
                const { endpoint, param } = getParamsByOption(option);

                return {
                    url: `/api/${parentEndpoint}/${endpoint}`,
                    method: 'POST',
                    params: { [`${param}`]: id },
                };
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Catalog' as never, id: arg.id }],
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
