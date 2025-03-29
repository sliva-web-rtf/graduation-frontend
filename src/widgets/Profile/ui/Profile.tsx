import { Stack } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ToggleList } from '@/features/profile/ToggleList';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ChangePasswordForm, PersonalInfoForm } from '@/widgets/PersonalData';
import { getProfile } from '../model/selectors/getProfile/getProfile';
import { profileReducer } from '../model/slice/profileSlice';
import { ProfileOption } from '../model/types/profileOption';

const initialReducers: ReducersList = {
    profile: profileReducer,
};

const Profile = memo(() => {
    const { option } = useSelector(getProfile);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack spacing={4} height="100%" maxWidth="600px">
                <ToggleList />
                {option === ProfileOption.PersonalData && <PersonalInfoForm />}
                {option === ProfileOption.Security && <ChangePasswordForm />}
            </Stack>
        </DynamicModuleLoader>
    );
});

export default Profile;
