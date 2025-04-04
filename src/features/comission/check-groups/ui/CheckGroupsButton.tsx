import { BaseButton } from '@/shared/ui';
import { useState } from 'react';
import { CheckGroupsModal } from './CheckGroupsModal';

type CheckGroupsButtonProps = {
    comissionName: string;
    comissionId: string;
};

export const СheckGroupsButton = (props: CheckGroupsButtonProps) => {
    const { comissionName, comissionId } = props;
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <>
            <BaseButton onClick={toggleOpen}>Просмотреть группы</BaseButton>
            <CheckGroupsModal
                open={open}
                onClose={toggleOpen}
                comissionName={comissionName}
                comissionId={comissionId}
            />
        </>
    );
};
