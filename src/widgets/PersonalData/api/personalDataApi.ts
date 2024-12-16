import { baseApi } from '@/shared/api';
import { PersonalInfoFormSchema } from '../model/types/personalInfoFormSchema';

const personalDataApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updateStudentProfileInfo: build.mutation<void, PersonalInfoFormSchema>({
            query: (initialValues) => ({
                url: '/api/users/update-profile-info',
                method: 'PUT',
                body: {
                    initialValues,
                },
            }),
        }),
    }),
});

export const updateStudentProfileInfo = personalDataApi.useUpdateStudentProfileInfoMutation;
