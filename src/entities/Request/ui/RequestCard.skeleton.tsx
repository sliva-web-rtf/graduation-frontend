import { Box, Paper, Skeleton, Stack } from '@mui/material';
import { BaseButton } from '@/shared/ui';
import styles from './RequestCard.module.scss';

export const RequestCardSkeleton = () => {
    return (
        <Paper className={styles.card}>
            <Box className={styles.top}>
                <Stack>
                    <Skeleton width="25%" />
                    <Skeleton width="90%" />
                    <Skeleton />
                </Stack>
                <Stack direction="row" spacing={2} alignSelf="center">
                    <BaseButton disabled>Отклонить</BaseButton>
                    <BaseButton variant="contained" disabled>
                        Принять
                    </BaseButton>
                </Stack>
            </Box>
        </Paper>
    );
};
