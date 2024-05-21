import { baseApi, isApiError } from 'shared/api';
import { AppErrorMapper } from 'shared/lib/types/mapper.ts/appErrorMapper';
import { PersonalInfoFormSchema } from '../model/types/personalInfoFormSchema';
import { updateProfileToDto, validationUpdateProfileErrorsFromDto } from '../lib/updateProfileMapper';

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
            transformErrorResponse: (error: unknown) => {
                if (isApiError(error)) {
                    const appError = AppErrorMapper.fromDtoWithValidationSupport(
                        error,
                        validationUpdateProfileErrorsFromDto,
                    );
                    return appError;
                }
                return error;
            },
        }),
    }),
});

export const updateProfile = onboardingApi.useUpdateProfileInfoMutation;
