import { baseApi } from '@/shared/api';
import { PersonalInfoFormSchema } from '../model/types/personalInfoFormSchema';
import { StudentSearchingStatus } from '../model/types/studentSearchingStatus';

const personalDataApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updateStudentProfileInfo: build.mutation<void, PersonalInfoFormSchema>({
            query: (initialValues) => ({
                url: '/api/users/update-profile-info',
                method: 'PUT',
                body: { ...initialValues, contactsTg: initialValues.contacts },
            }),
        }),
        getStudentProfile: build.query<PersonalInfoFormSchema, void>({
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
        updateStudentStatusSearching: build.mutation<void, StudentSearchingStatus>({
            query: (initialValues) => ({
                url: '/api/users/update-status',
                method: 'PUT',
                body: initialValues,
            }),
            invalidatesTags: ['StudentSearchingStatus'],
        }),
    }),
});

export const updateStudentProfileInfo = personalDataApi.useUpdateStudentProfileInfoMutation;
export const getStudentProfile = personalDataApi.useGetStudentProfileQuery;
export const getStudentSearchingStatus = personalDataApi.useGetStudentSearchingStatusQuery;
export const updateStudentStatusSearching = personalDataApi.useUpdateStudentStatusSearchingMutation;
