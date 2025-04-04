import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import styles from './PageLoader.module.scss';

export const PageLoader = () => (
    <Box className={styles.loaderContainer}>
        <CircularProgress />
    </Box>
);
