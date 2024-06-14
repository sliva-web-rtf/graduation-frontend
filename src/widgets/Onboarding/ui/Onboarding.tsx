import { Box, Stack } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { BaseButton, TabsWithStatus } from '@/shared/ui';
import { Role, getUserAuthData } from '@/entities/User';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { onboardingReducer } from '../model/slice/onboardingSlice';
import { StudentOnboarding } from './StudentOnboarding/StudentOnboarding.async';
import { getIsLoadingState } from '../model/selectors/getLoadingProfileStatus';
import ProfessorOnboarding from './ProfessorOnboarding/ProfessorOnboarding.async';
import { STATUS } from '@/shared/api/status';
import styles from './Onboarding.module.scss';

const initialReducers: ReducersList = {
    onboarding: onboardingReducer,
};

const values = ['1', '2', '3'];
const subTitles = ['Шаг 1', 'Шаг 2', 'Шаг 3'];
const titles = ['Личные данные', 'Научное портфолио', 'Статус поиска'];
const ERROR_TEXT = 'Произошла ошибка';
const FORM_ID = 'onboarding-form';

export const Onboarding = memo(() => {
    const user = useSelector(getUserAuthData);
    const isProfileLoading = useSelector(getIsLoadingState);

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
                        {user?.roles.includes(Role.Student) && (
                            <StudentOnboarding
                                id={FORM_ID}
                                onSuccess={onSuccess}
                                onError={onError}
                                onRequestStart={onRequestStart}
                                activeTabValue={activeTabValue}
                                values={values}
                            />
                        )}
                        {user?.roles.includes(Role.Professor) && (
                            <ProfessorOnboarding
                                id={FORM_ID}
                                onSuccess={onSuccess}
                                onError={onError}
                                onRequestStart={onRequestStart}
                                activeTabValue={activeTabValue}
                                values={values}
                            />
                        )}
                    </Box>
                    <Stack className={styles.actionsContainer} direction="row-reverse" justifyContent="space-between">
                        <BaseButton
                            disabled={isLoading || isProfileLoading === STATUS.request}
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
