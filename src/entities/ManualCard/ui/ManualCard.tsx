import { Box, Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ManualCardModel } from '../model/types/ManualCardModel';
import styles from './ManualCard.module.scss';

export const ManualCard = memo((props: ManualCardModel) => {
    const { icon, title, url } = props;

    return (
        <Stack className={styles.card} spacing={2} component={Paper} py={3} px={2} borderRadius={4}>
            <Box className={styles.icon} color="primary">
                {icon}
            </Box>
            <Link to={url} target="_blank">
                <Typography variant="h4">{title}</Typography>
            </Link>
        </Stack>
    );
});
