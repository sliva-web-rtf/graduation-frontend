import { baseApi } from 'shared/api';
import { PersonalInfoFormSchema } from '../model/types/personalInfoFormSchema';
import { updateProfileToDto } from '../lib/updateProfileMapper';

const onboardingApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updateProfileInfo: build.mutation<void, PersonalInfoFormSchema>({
            query: (initialValues) => ({
                url: '/api/on-boarding/update-profile-info',
                method: 'PUT',
                body: {
                    ...updateProfileToDto(initialValues),
                },
            }),
        }),
    }),
});

export const updateProfile = onboardingApi.useUpdateProfileInfoMutation;
