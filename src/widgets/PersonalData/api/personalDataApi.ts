import { baseApi } from '@/shared/api';
import { PersonalInfoFormSchema } from '../model/types/personalInfoFormSchema';
import { StudentSearchingStatus } from '../model/types/studentSearchingStatus';
import { ChangePasswordFormSchema } from '../model/types/changePasswordFormSchema';
import { ProfessorSearchingStatus } from '../model/types/professorSearchingStatus';

const personalDataApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updateProfileInfoPD: build.mutation<void, PersonalInfoFormSchema>({
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
        updateProfessorStatusSearchingPD: build.mutation<void, ProfessorSearchingStatus>({
            query: (initialValues) => ({
                url: '/api/users/professor-status',
                method: 'PUT',
                body: initialValues,
            }),
            invalidatesTags: ['ProfessorSearchingStatus'],
        }),
        updateStudentStatusSearchingPD: build.mutation<void, StudentSearchingStatus>({
            query: (initialValues) => ({
                url: '/api/users/update-status',
                method: 'PUT',
                body: initialValues,
            }),
            invalidatesTags: ['StudentSearchingStatus'],
        }),
        updatePassword: build.mutation<void, ChangePasswordFormSchema>({
            query: ({ repeatNewPassword, ...rest }) => ({
                url: '/api/users/update-user-password',
                method: 'PUT',
                body: {
                    ...rest,
                },
            }),
        }),
    }),
});

export const {
    useUpdatePasswordMutation: updatePassword,
    useUpdateProfileInfoPDMutation: updateProfileInfoPD,
    useGetProfileInfoQuery: getProfileInfo,
    useGetStudentSearchingStatusQuery: getStudentSearchingStatus,
    useUpdateStudentStatusSearchingPDMutation: updateStudentStatusSearchingPD,
    useGetProfessorSearchingStatusQuery: getProfessorSearchingStatus,
    useUpdateProfessorStatusSearchingPDMutation: updateProfessorStatusSearchingPD,
} = personalDataApi;
