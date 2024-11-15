import { Stack } from '@mui/material';
import { memo } from 'react';
import { ToggleList } from '@/features/profile/ToggleList';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from '../model/slice/profileSlice';

const initialReducers: ReducersList = {
    profile: profileReducer,
};

const Profile = memo(() => (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
        <Stack spacing={4} justifyContent="space-between" height="100%">
            <Stack direction="row" spacing={2}>
                <ToggleList />
            </Stack>
        </Stack>
    </DynamicModuleLoader>
));

export default Profile;
