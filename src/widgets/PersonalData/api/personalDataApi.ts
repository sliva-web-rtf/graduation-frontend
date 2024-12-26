import { baseApi } from '@/shared/api';
import { PersonalInfoFormSchema } from '../model/types/personalInfoFormSchema';
import { StudentSearchingStatus } from '../model/types/studentSearchingStatus';
import { ChangePasswordFormSchema } from '../model/types/changePasswordFormSchema';
import { ProfessorSearchingStatus } from '../model/types/professorSearchingStatus';

const personalDataApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updateProfileInfo: build.mutation<void, PersonalInfoFormSchema>({
            query: (initialValues) => ({
                url: '/api/users/update-profile-info',
                method: 'PUT',
                body: { ...initialValues, contactsTg: initialValues.contacts },
            }),
        }),
        getProfileInfo: build.query<PersonalInfoFormSchema, void>({
            query: () => ({
                url: '/api/users/get-profile-info',
            }),
            transformResponse: (response: PersonalInfoFormSchema) => {
                const values = {
                    ...response,
                    lastPasswordChangedDate: new Date(),
                };
                return values;
            },
        }),
        getStudentSearchingStatus: build.query<StudentSearchingStatus, void>({
            query: () => ({
                url: '/api/users/student-status',
            }),
            providesTags: ['StudentSearchingStatus'],
        }),
        getProfessorSearchingStatus: build.query<ProfessorSearchingStatus, void>({
            query: () => ({
                url: '/api/users/professor-status',
            }),
            providesTags: ['ProfessorSearchingStatus'],
        }),
        updateProfessorStatusSearching: build.mutation<void, ProfessorSearchingStatus>({
            query: (initialValues) => ({
                url: '/api/users/professor-status',
                method: 'PUT',
                body: initialValues,
            }),
            invalidatesTags: ['ProfessorSearchingStatus'],
        }),
        updateStudentStatusSearching: build.mutation<void, StudentSearchingStatus>({
            query: (initialValues) => ({
                url: '/api/users/update-status',
                method: 'PUT',
                body: initialValues,
            }),
            invalidatesTags: ['StudentSearchingStatus'],
        }),
        updatePassword: build.mutation<void, ChangePasswordFormSchema>({
            query: ({ repeatCurrentPassword, ...rest }) => ({
                url: '/api/users/update-user-password',
                method: 'PUT',
                body: {
                    ...rest,
                },
            }),
        }),
    }),
});

export const updatePassword = personalDataApi.useUpdatePasswordMutation;
export const updateProfileInfo = personalDataApi.useUpdateProfileInfoMutation;
export const getProfileInfo = personalDataApi.useGetProfileInfoQuery;
export const getStudentSearchingStatus = personalDataApi.useGetStudentSearchingStatusQuery;
export const updateStudentStatusSearching = personalDataApi.useUpdateStudentStatusSearchingMutation;
export const getProfessorSearchingStatus = personalDataApi.useGetProfessorSearchingStatusQuery;
export const updateProfessorStatusSearching = personalDataApi.useUpdateProfessorStatusSearchingMutation;
