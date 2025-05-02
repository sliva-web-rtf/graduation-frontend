import { CreateCommissionButton } from '@/features/comission/create-comission';
import { Stack } from '@mui/material';
import { ComissionsList } from './ComissionsList';

export const Comissions = () => {
    return (
        <Stack spacing={4} height="100%" justifyContent="space-between">
            <CreateCommissionButton />
            <ComissionsList />
        </Stack>
    );
};
