import { baseApi, isApiError } from '@/shared/api';
import { AppErrorMapper } from '@/shared/lib/types/mapper.ts/appErrorMapper';
import { PersonalInfoFormSchema } from '../model/types/personalInfoFormSchema';
import { updateProfileToDto, validationUpdateProfileErrorsFromDto } from '../lib/updateProfileMapper';
import { StudentProfile } from '../model/types/studentProfile';
import { StudentProfileDto } from './types';
import { studentProfileFromDto } from '../lib/studentProfileMapper';
import {
    updateStudentScientificPortfolioToDto,
    validationStudentScientificPortfolioErrorsFromDto,
} from '../lib/studentScientificInfoMapper';
import { ScientificFormSchema } from '../model/types/scientificFormSchema';
import { onboardingActions } from '../model/slice/onboardingSlice';

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
        updateStudentScientificInfo: build.mutation<void, ScientificFormSchema>({
            query: (initialValues) => ({
                url: '/api/on-boarding/update-scientific-portfolio',
                method: 'PUT',
                body: {
                    ...updateStudentScientificPortfolioToDto(initialValues),
                },
            }),
            transformErrorResponse: (error: unknown) => {
                if (isApiError(error)) {
                    const appError = AppErrorMapper.fromDtoWithValidationSupport(
                        error,
                        validationStudentScientificPortfolioErrorsFromDto,
                    );
                    return appError;
                }
                return error;
            },
        }),
        getStudentProfile: build.query<StudentProfile, void>({
            query: () => ({
                url: '/api/on-boarding/student-profile',
            }),
            onQueryStarted: async (_, api) => {
                const { dispatch, queryFulfilled } = api;
                try {
                    dispatch(onboardingActions.setLoadingState(true));
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(onboardingActions.setUpdatedProfileInfo(data.personalInfo));
                        dispatch(onboardingActions.setStudentScientificInfo(data.scientificPorfolio));
                    }
                } catch (err) {
                    /* empty */
                } finally {
                    dispatch(onboardingActions.setLoadingState(false));
                }
            },
            transformResponse: (studentProfileDto: StudentProfileDto) => studentProfileFromDto(studentProfileDto),
        }),
    }),
});

export const updateProfile = onboardingApi.useUpdateProfileInfoMutation;
export const updateStudentScientificInfo = onboardingApi.useUpdateStudentScientificInfoMutation;
export const getLazyStudentProfile = onboardingApi.useLazyGetStudentProfileQuery;
