import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { isUserProfessor } from '@/entities/User';
import { UploadAvatar, useGetAvatar } from '@/features/avatar';
import { ProfessorStatusSearching } from './ProfessorStatusSearching/ProfessorStatusSearching';
import { StudentPersonalInfoForm } from './StudentPersonalInfoForm/StudentPersonalInfoForm';
import { StudentStatusSearching } from './StudentStatusSearching/StudentStatusSearching';

export const PersonalData = () => {
    const { data: avatarUrl, isLoading: isAvatarLoading } = useGetAvatar();
    const isProfessor = useSelector(isUserProfessor);

    return (
        <Grid container gap={6}>
            <Grid>
                <UploadAvatar isAvatarGetting={isAvatarLoading} url={avatarUrl} />
            </Grid>
            <Grid xs={5}>
                <StudentPersonalInfoForm />
            </Grid>
            <Grid>{isProfessor ? <ProfessorStatusSearching /> : <StudentStatusSearching />}</Grid>
        </Grid>
    );
};
