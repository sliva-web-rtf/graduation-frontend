import { useState } from 'react';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { EditOutlinedIcon } from '@/shared/assets/icons';
import { BaseButton } from '@/shared/ui';
import { ChangeStudentStatusModal } from './ChangeStudentStatusModal';
import { isUserProfessor } from '@/entities/User';
import { ChangeProfessorStatusModal } from './ChangeProfessorStatusModal';

export const ChangeStatusButton = () => {
    const [open, setOpen] = useState(false);
    const isProfessor = useSelector(isUserProfessor);
    const toggleOpen = () => {
        setOpen((prev) => !prev);
    };

    return (
        <Stack>
            <BaseButton
                sx={(theme) => ({
                    alignSelf: 'flex-start',
                    padding: [theme.spacing(1.5), theme.spacing(3)].join(' '),
                    border: '2px solid #C1C7CD',
                })}
                startIcon={<EditOutlinedIcon />}
                onClick={toggleOpen}
            >
                Изменить статус
            </BaseButton>
            {isProfessor ? (
                <ChangeProfessorStatusModal open={open} onClose={toggleOpen} id="1" />
            ) : (
                <ChangeStudentStatusModal open={open} onClose={toggleOpen} />
            )}
        </Stack>
    );
};
