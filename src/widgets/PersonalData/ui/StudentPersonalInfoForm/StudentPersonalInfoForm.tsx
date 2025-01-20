import { Stack } from '@mui/material';
import { ChangePasswordForm } from '../ChangePasswordForm/ChangePasswordForm';
import { PersonalInfoForm } from '../PersonalInfoForm/PersonalInfoForm';

// @todo поменять название вместо StudentPersonalInfoForm на что-то общее(студент+профессор)
export const StudentPersonalInfoForm = () => (
    <Stack spacing={6}>
        <PersonalInfoForm />
        <ChangePasswordForm />
    </Stack>
);
