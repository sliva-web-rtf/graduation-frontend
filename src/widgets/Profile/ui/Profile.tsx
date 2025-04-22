import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { BaseAlert } from '@/shared/ui';
import { ChangePasswordForm, PersonalInfoForm } from '@/widgets/PersonalData';
import { Stack } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getProfile, ProfileOption, profileReducer } from '../model';
import { ToggleList } from './ToggleList';

const initialReducers: ReducersList = {
    profile: profileReducer,
};

const Profile = memo(() => {
    const { option } = useSelector(getProfile);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack spacing={4} height="100%" maxWidth="600px">
                {/* {TODO: убрать после релиза} */}
                <BaseAlert severity="warning">Раздел находится в разработке, изменить данные не получится</BaseAlert>
                <ToggleList />
                {option === ProfileOption.PersonalData && <PersonalInfoForm />}
                {option === ProfileOption.Security && <ChangePasswordForm />}
            </Stack>
        </DynamicModuleLoader>
    );
});

export default Profile;
