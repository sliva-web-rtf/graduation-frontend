import { Grid, Stack } from '@mui/material';
import { UploadAvatar, useGetAvatar } from '@/features/avatar';
import { StudentPersonalInfoForm } from './StudentPersonalInfoForm/StudentPersonalInfoForm';
import { StudentStatusSearching } from './StudentStatusSearching/StudentStatusSearching';

export const PersonalData = () => {
    const { data: avatarUrl, isLoading: isAvatarLoading } = useGetAvatar();
    return (
        <Grid container gap={6}>
            <Grid>
                <UploadAvatar isAvatarGetting={isAvatarLoading} url={avatarUrl} />
            </Grid>
            <Grid xs={5}>
                <StudentPersonalInfoForm />
            </Grid>
            <Grid>
                <StudentStatusSearching />
            </Grid>
        </Grid>
    );
};
