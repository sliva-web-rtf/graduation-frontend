import { toast } from 'react-toastify';
import { baseApi } from '@/shared/api';
import { AddProfessorRequest } from '../model/types/addProfessorRequest';
import { AddStudentRequest } from '../model/types/addStudentRequest';
import { AddScientificWorkRequest } from '../model/types/addScientificWorkRequest';

const addRequestsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
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
        addScientificWork: build.mutation<void, AddScientificWorkRequest>({
            query: (body) => ({
                url: `/api/scientificWork/enter`,
                method: 'POST',
                body,
            }),
            transformResponse: () => {
                toast.success('Запрос успешно отправлен');
            },
        }),
    }),
});

export const { useAddProfessorMutation, useAddStudentMutation, useAddScientificWorkMutation } = addRequestsApi;
