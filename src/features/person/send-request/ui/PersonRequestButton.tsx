import { BaseButton } from '@/shared/ui';
import { useState } from 'react';
import { PersonRequestModal } from './PersonRequestModal';

type PersonRequestButtonProps = {
    id: string;
    name: string;
};

export const PersonRequestButton = (props: PersonRequestButtonProps) => {
    const { id, name } = props;
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <>
            <BaseButton variant="contained" onClick={toggleOpen}>
                Оформить заявку
            </BaseButton>
            <PersonRequestModal id={id} name={name} open={open} onClose={toggleOpen} />
        </>
    );
};
