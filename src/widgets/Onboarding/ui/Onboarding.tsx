import { Box, Skeleton, Stack } from '@mui/material';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { UploadAvatar, useGetAvatar } from '@/features/avatar';
import { BaseButton, TabsWithStatus } from '@/shared/ui';
import { Role, getUserAuthData } from '@/entities/User';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { PersonalInfoForm } from './PersonalInfoForm/PersonalInfoForm';
import { onboardingActions, onboardingReducer } from '../model/slice/onboardingSlice';
import styles from './Onboarding.module.scss';
import { getLazyStudentProfile } from '../api/onboardingApi';
import { StudentProfile } from '../model/types/student-profile';

const initialReducers: ReducersList = {
    onboarding: onboardingReducer,
};

const values = ['1', '2', '3'];
const subTitles = ['Шаг 1', 'Шаг 2', 'Шаг 3'];
const titles = ['Личные данные', 'Научное портфолио', 'Статус поиска'];
const ERROR_TEXT = 'Произошла ошибка';
const FORM_ID = 'onboarding-form';

const FormSkeleton = () => (
    <Stack direction="row" spacing={4} flex={1}>
        <Stack flex={1} spacing={2}>
            <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Skeleton width="100%" height={56} />
                <Skeleton width="100%" height={56} />
                <Skeleton width="100%" height={56} />
            </Stack>
            <Skeleton width="100%" height={56} />
            <Skeleton width="100%" height={56} />
            <Skeleton width="100%" height={56} />
        </Stack>
    </Stack>
);

export const Onboarding = memo(() => {
    const dispatch = useAppDispatch();
    const user = useSelector(getUserAuthData);
    const { data: avatarUrl, isLoading: isAvatarLoading } = useGetAvatar();
    const [getStudentProfile] = getLazyStudentProfile();

    const [isLoading, setIsLoading] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [studentProfile, setStudentProfile] = useState<null | StudentProfile>(null);
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
        },
        [setIsLoading],
    );

    const onRequestStart = useCallback(() => {
        setIsLoading(true);
        setErrors(null);
    }, [setIsLoading]);

    useEffect(() => {
        if (user?.roles.includes(Role.Student)) {
            setIsProfileLoading(true);
            getStudentProfile().then((response) => {
                if (response.data) {
                    dispatch(onboardingActions.setUpdatedProfileInfo(response?.data.personalInfo));
                    setStudentProfile(response.data);
                }
                setIsProfileLoading(false);
            });
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
                        {isProfileLoading && <FormSkeleton />}
                        {!isProfileLoading && activeTabValue === values[0] && (
                            <Stack direction="row" spacing={4} sx={{ flex: 1 }}>
                                <UploadAvatar isAvatarGetting={isAvatarLoading} url={avatarUrl} />
                                <PersonalInfoForm
                                    id={FORM_ID}
                                    onError={() => onError(values[0])}
                                    onSuccess={() => onSuccess(values[0], values[1])}
                                    onRequestStart={onRequestStart}
                                    initialValues={studentProfile?.personalInfo}
                                />
                            </Stack>
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
