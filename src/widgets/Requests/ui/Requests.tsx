import { Stack } from '@mui/material';
import { RequestsList } from './RequestsList';
import { ToggleList } from './ToggleList';

export const Requests = () => (
    <Stack spacing={4}>
        <ToggleList />
        <RequestsList />
    </Stack>
);
