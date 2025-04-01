import InboxIcon from '@mui/icons-material/Inbox';
import { Box, Stack, Typography } from '@mui/material';

const NotFoundPage = () => (
    <Box display="flex" sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} height="100%">
        <Stack spacing={1} alignItems="center">
            <InboxIcon fontSize="large" color="secondary" sx={{ width: 48, height: 48 }} />
            <Typography color="secondary">Кажется, такой страницы не существует</Typography>
        </Stack>
    </Box>
);

export default NotFoundPage;
