import { BaseButton } from '@/shared/ui';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMyStudentsState } from '../model';
import { SetDefenceDateModal } from './SetDefenceDateModal';

export const SetDefenceDateButton = memo(() => {
    const { stage, selectedStudents } = useSelector(getMyStudentsState);
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            <BaseButton size="small" variant="contained" onClick={toggleOpen} disabled={!selectedStudents?.length}>
                Назначить предзащиту
            </BaseButton>
            <SetDefenceDateModal open={open} onClose={toggleOpen} stage={stage} selectedStudents={selectedStudents} />
        </>
    );
});
