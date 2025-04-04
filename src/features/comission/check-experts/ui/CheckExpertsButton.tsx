import { BaseButton } from '@/shared/ui';
import { useState } from 'react';
import { CheckExpertsModal } from './CheckExpertsModal';

type CheckExpertsButtonProps = {
    comissionName: string;
    comissionId: string;
};

export const CheckExpertsButton = (props: CheckExpertsButtonProps) => {
    const { comissionName, comissionId } = props;
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <>
            <BaseButton onClick={toggleOpen}>Просмотреть экспертов</BaseButton>
            <CheckExpertsModal
                open={open}
                onClose={toggleOpen}
                comissionName={comissionName}
                comissionId={comissionId}
            />
        </>
    );
};
