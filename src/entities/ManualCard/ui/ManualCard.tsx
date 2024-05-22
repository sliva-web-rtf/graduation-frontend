import { Box, Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from 'app/providers/Router/config/routeConfig';
import { ManualCardModel } from '../model/types/ManualCardModel';
import styles from './ManualCard.module.scss';

export const ManualCard = memo((props: ManualCardModel) => {
    const { id, icon, title, description } = props;

    return (
        <Stack className={styles.card} spacing={2} component={Paper} py={3} px={2} borderRadius={4}>
            <Box className={styles.icon} color="primary">
                {icon}
            </Box>
            <Link to={`${RoutePath.Manual}/${id}`}>
                <Typography variant="h4">{title}</Typography>
            </Link>
            <Typography className={styles.hoverText} variant="subtitle1">
                {description}
            </Typography>
        </Stack>
    );
});
