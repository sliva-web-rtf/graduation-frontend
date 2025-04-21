import { baseApi } from '@/shared/api';
import { ChangePasswordFormSchema } from '../model/types/changePasswordFormSchema';
import { PersonalInfoFormSchema } from '../model/types/personalInfoFormSchema';

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
} = personalDataApi;
