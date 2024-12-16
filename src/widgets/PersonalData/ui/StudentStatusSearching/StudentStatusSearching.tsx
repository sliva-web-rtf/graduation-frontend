import { useState } from 'react';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { EditOutlinedIcon } from '@/shared/assets/icons';
import { BaseButton } from '@/shared/ui';
import { StudentSearchStatusForm } from '@/widgets/Onboarding/ui/SearchStatusForm/SearchStatusForm';
import { ChangeStatusButton } from '@/features/changeStatusButton';

export const StudentStatusSearching = () => (
    <Stack sx={{ backgroundColor: 'white', padding: 3, borderRadius: 4 }}>
        <h4 style={{ marginBottom: '8px' }}>Статус поиска</h4>
        <ChangeStatusButton />
    </Stack>
);
