import { Box, Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import { ManualCardModel } from '../model/types/ManualCardModel';
import styles from './ManualCard.module.scss';

export const ManualCard = memo((props: ManualCardModel) => {
    const { icon, title, url } = props;

    return (
        <Paper
            component={Link}
            to={url}
            target="_blank"
            className={styles.card}
            sx={{
                borderRadius: 4,
                padding: 2,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'none' },
            }}
        >
            <Stack spacing={2} py={1}>
                <Box className={styles.icon} color="primary">
                    {icon}
                </Box>
                <Typography variant="h4" className={styles.title}>
                    {title}
                </Typography>
            </Stack>
        </Paper>
    );
});
