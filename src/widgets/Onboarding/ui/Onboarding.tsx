import { Box, Stack } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { UploadAvatar, useGetAvatar } from '@/features/avatar';
import { BaseButton, TabsWithStatus } from '@/shared/ui';
import { Role, getUserAuthData } from '@/entities/User';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { PersonalInfoForm } from './PersonalInfoForm/PersonalInfoForm';
import { onboardingReducer } from '../model/slice/onboardingSlice';
import { getLazyStudentProfile } from '../api/onboardingApi';
import { OnboardingFormSkeleton } from './OnboardingForm.skeleton';
import { getIsLoadingState } from '../model/selectors/getLoadingProfileStatus';
import { StudentProfile } from '../model/types/studentProfile';
import { StudentScientificPorfolioForm } from './ScientificPortfolioForm/ScientificPortfolioForm';
import styles from './Onboarding.module.scss';
import { getStudent } from '../model/selectors/getStudent';
import { StudentSearchStatusForm } from './SearchStatusForm/SearchStatusForm';

const initialReducers: ReducersList = {
    onboarding: onboardingReducer,
};

const values = ['1', '2', '3'];
const subTitles = ['Шаг 1', 'Шаг 2', 'Шаг 3'];
const titles = ['Личные данные', 'Научное портфолио', 'Статус поиска'];
const ERROR_TEXT = 'Произошла ошибка';
const FORM_ID = 'onboarding-form';

export const Onboarding = memo(() => {
    const dispatch = useAppDispatch();
    const user = useSelector(getUserAuthData);
    const student = useSelector(getStudent);
    const isProfileLoading = useSelector(getIsLoadingState);

    const { data: avatarUrl, isLoading: isAvatarLoading } = useGetAvatar();
    const [getStudentProfile] = getLazyStudentProfile();

    const [isLoading, setIsLoading] = useState(false);
    const [activeTabValue, setActiveTabValue] = useState<(typeof values)[number]>(values[0]);
    const [successTabValue, setSuccessTabValue] = useState<typeof values>([]);
    const [errors, setErrors] = useState<null | Record<(typeof values)[number], string>>(null);

    const goBack = useCallback(() => {
        const activeTabValueIndex = values.indexOf(activeTabValue);
        setActiveTabValue(values[activeTabValueIndex - 1]);
    }, [activeTabValue]);

    const onSuccess = useCallback(
        (currentValue: (typeof values)[number], nextValue?: (typeof values)[number]) => {
            setIsLoading(false);
            if (nextValue) {
                setActiveTabValue(nextValue);
            }
            setSuccessTabValue([...successTabValue, currentValue]);
        },
        [successTabValue],
    );

    const onError = useCallback(
        (value: (typeof values)[number]) => {
            setIsLoading(false);
            setErrors({
                [value]: ERROR_TEXT,
            });
            setSuccessTabValue(successTabValue.filter((targetValue) => targetValue !== value));
        },
        [setIsLoading, successTabValue],
    );

    const onRequestStart = useCallback(() => {
        setIsLoading(true);
        setErrors(null);
    }, [setIsLoading]);

    useEffect(() => {
        if (user?.roles.includes(Role.Student)) {
            getStudentProfile();
        }
    }, [dispatch, getStudentProfile, user]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Box>
                <TabsWithStatus
                    errors={errors ?? undefined}
                    titles={titles}
                    subTitles={subTitles}
                    values={values}
                    activeValue={activeTabValue}
                    successValues={successTabValue}
                />
                <Stack spacing={2} className={styles.formsContainer}>
                    <Box className={styles.formWrapper}>
                        {isProfileLoading && <OnboardingFormSkeleton />}
                        {!isProfileLoading && activeTabValue === values[0] && (
                            <Stack direction="row" spacing={4} sx={{ flex: 1 }}>
                                <UploadAvatar isAvatarGetting={isAvatarLoading} url={avatarUrl} />
                                <PersonalInfoForm
                                    id={FORM_ID}
                                    onError={() => onError(values[0])}
                                    onSuccess={() => onSuccess(values[0], values[1])}
                                    onRequestStart={onRequestStart}
                                    initialValues={student?.personalInfo}
                                />
                            </Stack>
                        )}
                        {!isProfileLoading && activeTabValue === values[1] && (
                            <StudentScientificPorfolioForm
                                id={FORM_ID}
                                onError={() => onError(values[1])}
                                onSuccess={() => onSuccess(values[1], values[2])}
                                onRequestStart={onRequestStart}
                                initialValues={student?.scientificPorfolio}
                            />
                        )}
                        {!isProfileLoading && activeTabValue === values[2] && (
                            <StudentSearchStatusForm
                                id={FORM_ID}
                                onError={() => onError(values[2])}
                                onSuccess={() => onSuccess(values[2])}
                                onRequestStart={onRequestStart}
                                initialValues={student?.studentStatus}
                            />
                        )}
                    </Box>
                    <Stack className={styles.actionsContainer} direction="row-reverse" justifyContent="space-between">
                        <BaseButton
                            disabled={isLoading || isProfileLoading}
                            type="submit"
                            form={FORM_ID}
                            variant="contained"
                        >
                            Далее
                        </BaseButton>
                        {values[0] !== activeTabValue && (
                            <BaseButton onClick={goBack} disabled={isLoading} variant="outlined">
                                Назад
                            </BaseButton>
                        )}
                    </Stack>
                </Stack>
            </Box>
        </DynamicModuleLoader>
    );
});
