import { Paper, Skeleton, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import styles from './CatalogCard.module.scss';

export const CatalogCardSkeleton = memo(() => (
    <Paper className={styles.card}>
        <Stack spacing={3} justifyContent="space-between">
            <Stack>
                <Skeleton width="30%" />
                <Skeleton width="70%" />
            </Stack>
            <Stack>
                <Typography variant="subtitle1" width="100%">
                    <Skeleton />
                </Typography>
                <Typography variant="subtitle1" width="95%">
                    <Skeleton />
                </Typography>
                <Typography variant="subtitle1" width="80%">
                    <Skeleton />
                </Typography>
            </Stack>
        </Stack>
        <Skeleton width={120} height={40} sx={{ alignSelf: 'center' }} />
    </Paper>
));
