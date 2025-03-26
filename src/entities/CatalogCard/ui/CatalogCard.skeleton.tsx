import { memo } from 'react';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import styles from './CatalogCard.module.scss';

export const CatalogCardSkeleton = memo(() => (
    <Box className={styles.card} sx={{ borderRadius: 3 }}>
        <Stack spacing={3} justifyContent="space-between">
            <Stack>
                <Skeleton width="30%" />
                <Skeleton width="70%" />
            </Stack>
            <Stack>
                <Typography variant="subtitle1" color="secondary" width="100%">
                    <Skeleton />
                </Typography>
                <Typography variant="subtitle1" color="secondary" width="95%">
                    <Skeleton />
                </Typography>
                <Typography variant="subtitle1" color="secondary" width="80%">
                    <Skeleton />
                </Typography>
            </Stack>
        </Stack>
        <Skeleton width={120} height={40} sx={{ alignSelf: 'center' }} />
    </Box>
));
