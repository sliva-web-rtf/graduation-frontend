import { Stack } from '@mui/material';
import { memo } from 'react';
import { ToggleList } from '@/features/profile/ToggleList';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from '../model/slice/profileSlice';
import { ConditionComponent } from '@/shared/ui';

const initialReducers: ReducersList = {
    profile: profileReducer,
};

const Profile = memo(() => (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
        <Stack spacing={4} height="100%" display="block">
            <ToggleList />
            <ConditionComponent />
        </Stack>
    </DynamicModuleLoader>
));

export default Profile;
