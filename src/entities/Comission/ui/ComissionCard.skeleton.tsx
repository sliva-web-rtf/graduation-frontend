import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Paper, Skeleton, Stack } from '@mui/material';

export const ComissionCardSkeleton = () => {
    return (
        <Paper
            component={Stack}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={(theme) => ({ borderRadius: theme.spacing(2), height: theme.spacing(10), padding: theme.spacing(2) })}
        >
            <Stack width="100%">
                <Skeleton width="30%" />
                <Stack direction="row" spacing={1}>
                    <Skeleton width="20%" />
                    <Skeleton width="30%" />
                </Stack>
            </Stack>
            <ExpandMoreIcon />
        </Paper>
    );
};
