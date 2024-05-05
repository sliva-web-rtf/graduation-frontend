import { Box, Stack } from '@mui/material';
import { memo } from 'react';

import { BaseButton, TabsWithStatus } from 'shared/ui';
import styles from './Onboarding.module.scss';

export const Onboarding = memo(() => (
    <Box>
        <TabsWithStatus
            titles={['Личные данные', 'Научное портфолио', 'Статус поиска']}
            subTitles={['Шаг 1', 'Шаг 2', 'Шаг 3']}
            values={[1, 2, 3]}
            successValues={[1]}
            activeValue={2}
            errors={{
                2: 'текст',
            }}
        />
        <Stack spacing={2} className={styles.formsContainer}>
            <Box className={styles.formWrapper}>Форма</Box>
            <Stack className={styles.actionsContainer} direction="row" justifyContent="space-between">
                <BaseButton variant="outlined">Назад</BaseButton>
                <BaseButton variant="contained">Далее</BaseButton>
            </Stack>
        </Stack>
    </Box>
));
