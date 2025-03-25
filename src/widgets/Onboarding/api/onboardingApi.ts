import { toast } from 'react-toastify';
import { baseApi, isApiError } from '@/shared/api';
import { AppErrorMapper } from '@/shared/lib/types/mapper.ts/appErrorMapper';
import { PersonalInfoFormSchema } from '../model/types/personalInfoFormSchema';
import { updateProfileToDto, validationUpdateProfileErrorsFromDto } from '../lib/updateProfileMapper';
import { StudentProfile } from '../model/types/studentProfile';
import { ProfessorProfileDto, StudentProfileDto } from './types';
import { studentProfileFromDto } from '../lib/studentProfileMapper';
import {
    updateStudentScientificPortfolioToDto,
    validationStudentScientificPortfolioErrorsFromDto,
} from '../lib/studentScientificInfoMapper';
import { ScientificFormSchema } from '../model/types/scientificFormSchema';
import { onboardingActions } from '../model/slice/onboardingSlice';
import { StudentSearchingStatus } from '../model/types/studentStatus';
import { updateStudentStatusToDto, validationUpdateStudentStatusErrorsFromDto } from '../lib/studentStatusMapper';
import { userActions } from '@/entities/User';
import { STATUS } from '@/shared/api/status';
import { ProfessorPersonalInfoFormSchema } from '../model/types/professorInfoFormSchema';
import { updateProfessorProfileToDto } from '../lib/professorPersonaInfoMapper';
import { professorProfileFromDto } from '../lib/professorProfileMapper';
import { ProfessorProfile } from '../model/types/professorProfile';
import { ProfessorScientificFormSchema } from '../model/types/professorScientificFormSchema';
import {
    updateProfessorScientificPortfolioToDto,
    validationProfessorScientificPortfolioErrorsFromDto,
} from '../lib/professorScientificInfoMapper';
import { ProfessorSearchingStatus } from '../model/types/professorStatus';
import { updateProfessorStatusToDto, validationUpdateProfessorStatusErrorsFromDto } from '../lib/professorStatusMapper';

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
        updateProfessorProfileInfo: build.mutation<void, ProfessorPersonalInfoFormSchema>({
            query: (initialValues) => ({
                url: '/api/on-boarding/update-profile-info',
                method: 'PUT',
                body: {
                    ...updateProfessorProfileToDto(initialValues),
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
        updateStudentStatusSearching: build.mutation<void, StudentSearchingStatus>({
            query: (initialValues) => ({
                url: '/api/on-boarding/update-status',
                method: 'PUT',
                body: {
                    ...updateStudentStatusToDto(initialValues),
                },
            }),
            transformErrorResponse: (error: unknown) => {
                if (isApiError(error)) {
                    const appError = AppErrorMapper.fromDtoWithValidationSupport(
                        error,
                        validationUpdateStudentStatusErrorsFromDto,
                    );
                    return appError;
                }

                return error;
            },
        }),
        updateProfessorStatusSearching: build.mutation<void, ProfessorSearchingStatus>({
            query: (initialValues) => ({
                url: '/api/on-boarding/update-professor-status',
                method: 'PUT',
                body: {
                    ...updateProfessorStatusToDto(initialValues),
                },
            }),
            transformErrorResponse: (error: unknown) => {
                if (isApiError(error)) {
                    const appError = AppErrorMapper.fromDtoWithValidationSupport(
                        error,
                        validationUpdateProfessorStatusErrorsFromDto,
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
        updateProfessorScientificInfo: build.mutation<void, ProfessorScientificFormSchema>({
            query: (initialValues) => ({
                url: '/api/on-boarding/update-professor-scientific-portfolio',
                method: 'PUT',
                body: {
                    ...updateProfessorScientificPortfolioToDto(initialValues),
                },
            }),
            transformErrorResponse: (error: unknown) => {
                if (isApiError(error)) {
                    const appError = AppErrorMapper.fromDtoWithValidationSupport(
                        error,
                        validationProfessorScientificPortfolioErrorsFromDto,
                    );
                    return appError;
                }

                return error;
            },
        }),
        completeRegistration: build.mutation<void, void>({
            query: () => ({
                url: '/api/on-boarding/complete',
                method: 'POST',
                body: {},
            }),
            transformErrorResponse: () => {
                toast.error('Что-то пошло не так! Попробуйте еще раз');
            },
            onQueryStarted: async (_, api) => {
                const { dispatch, queryFulfilled } = api;
                try {
                    await queryFulfilled;
                    dispatch(userActions.changeRegistration(true));
                } catch (err) {
                    /* empty */
                }
            },
        }),
        getProfessorProfile: build.query<ProfessorProfile, void>({
            query: () => ({
                url: '/api/on-boarding/professor-profile',
            }),
            onQueryStarted: async (_, api) => {
                const { dispatch, queryFulfilled } = api;
                try {
                    dispatch(onboardingActions.setLoadingState(STATUS.request));
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(onboardingActions.setProfessorUpdatedProfileInfo(data.personalInfo));
                        dispatch(onboardingActions.setProfessorScientificPortfolio(data.scientificPorfolio));
                    }
                    dispatch(onboardingActions.setLoadingState(STATUS.success));
                } catch (err) {
                    dispatch(onboardingActions.setLoadingState(STATUS.failure));
                    /* empty */
                }
            },
            transformResponse: (professorProfileDto: ProfessorProfileDto) =>
                professorProfileFromDto(professorProfileDto),
        }),
        getStudentProfile: build.query<StudentProfile, void>({
            query: () => ({
                url: '/api/on-boarding/student-profile',
            }),
            onQueryStarted: async (_, api) => {
                const { dispatch, queryFulfilled } = api;
                try {
                    dispatch(onboardingActions.setLoadingState(STATUS.request));
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(onboardingActions.setUpdatedProfileInfo(data.personalInfo));
                        dispatch(onboardingActions.setStudentScientificInfo(data.scientificPorfolio));
                        dispatch(onboardingActions.setStudentStudentStatus(data.studentStatus));
                    }
                    dispatch(onboardingActions.setLoadingState(STATUS.success));
                } catch (err) {
                    dispatch(onboardingActions.setLoadingState(STATUS.failure));
                    /* empty */
                }
            },
            transformResponse: (studentProfileDto: StudentProfileDto) => studentProfileFromDto(studentProfileDto),
        }),
    }),
});

export const updateProfile = onboardingApi.useUpdateProfileInfoMutation;
export const updateProfessorProfile = onboardingApi.useUpdateProfessorProfileInfoMutation;
export const completeRegistration = onboardingApi.useCompleteRegistrationMutation;
export const updateStudentScientificInfo = onboardingApi.useUpdateStudentScientificInfoMutation;
export const updateStudentStatusSearching = onboardingApi.useUpdateStudentStatusSearchingMutation;
export const getLazyStudentProfile = onboardingApi.useLazyGetStudentProfileQuery;
export const getLazyProfessorProfile = onboardingApi.useLazyGetProfessorProfileQuery;
export const updateProfessorScientificInfo = onboardingApi.useUpdateProfessorScientificInfoMutation;
export const updateProfessorStatusSearching = onboardingApi.useUpdateProfessorStatusSearchingMutation;
