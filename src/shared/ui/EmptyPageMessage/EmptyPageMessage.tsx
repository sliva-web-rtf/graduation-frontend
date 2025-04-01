import InboxIcon from '@mui/icons-material/Inbox';
import { Box, Stack, Typography } from '@mui/material';

type EmptyMessageProps = {
    message?: string;
};

export const EmptyMessage = (props: EmptyMessageProps) => {
    const { message = 'Информация отсутсвует' } = props;

    return (
        <Box display="flex" sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} height="100%">
            <Stack spacing={1} alignItems="center">
                <InboxIcon fontSize="large" color="secondary" sx={{ width: 48, height: 48 }} />
                <Typography color="secondary">{message}</Typography>
            </Stack>
        </Box>
    );
};
