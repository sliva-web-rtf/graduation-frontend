import { BaseButton } from '@/shared/ui';
import { useState } from 'react';
import { CheckStudentsModal } from './ComissionStudentsModal';

type CheckStudentsButtonProps = {
    comissionName: string;
    comissionId: string;
};

export const CheckStudentsButton = (props: CheckStudentsButtonProps) => {
    const { comissionName, comissionId } = props;
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <>
            <BaseButton onClick={toggleOpen}>Просмотреть студентов</BaseButton>
            <CheckStudentsModal
                open={open}
                onClose={toggleOpen}
                comissionName={comissionName}
                comissionId={comissionId}
            />
        </>
    );
};
