import { Stack } from '@mui/material';
import { PersonalInfoForm } from '../PersonalInfoForm/PersonalInfoForm';
import { ChangePasswordForm } from '../ChangePasswordForm/ChangePasswordForm';

export const StudentPersonalInfoForm = () => (
    <Stack gap={2}>
        <PersonalInfoForm />
        <ChangePasswordForm />
    </Stack>
);
