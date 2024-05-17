import { Box, Stack } from '@mui/material';
import { memo, useCallback, useEffect } from 'react';

import { UploadAvatar, useGetAvatar } from 'features/avatar';
import { BaseButton, TabsWithStatus } from 'shared/ui';
import styles from './Onboarding.module.scss';
import { PersonalInfoForm } from './PersonalInfoForm/PersonalInfoForm';

export const Onboarding = memo(() => {
    const { data: avatarUrl, isLoading, error } = useGetAvatar();

    return (
        <Box>
            <TabsWithStatus
                titles={['Личные данные', 'Научное портфолио', 'Статус поиска']}
                subTitles={['Шаг 1', 'Шаг 2', 'Шаг 3']}
                values={[1, 2, 3]}
                activeValue={1}
            />
            <Stack spacing={2} className={styles.formsContainer}>
                <Box className={styles.formWrapper}>
                    <Stack direction="row" spacing={4} sx={{ flex: 1 }}>
                        <UploadAvatar isAvatarGetting={isLoading} url={avatarUrl} />
                        <PersonalInfoForm />
                    </Stack>
                </Box>
                <Stack className={styles.actionsContainer} direction="row" justifyContent="space-between">
                    <BaseButton variant="outlined">Назад</BaseButton>
                    <BaseButton variant="contained">Далее</BaseButton>
                </Stack>
            </Stack>
        </Box>
    );
});
