import { CreateCommissionButton } from '@/features/comission/create-commission';
import { Stack } from '@mui/material';
import { ComissionsList } from './ComissionsList';

export const Comissions = () => {
    return (
        <Stack spacing={4} height="100%">
            <CreateCommissionButton />
            <ComissionsList />
        </Stack>
    );
};
