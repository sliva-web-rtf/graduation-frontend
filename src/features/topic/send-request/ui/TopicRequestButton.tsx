import { BaseButton } from '@/shared/ui';
import { useState } from 'react';
import { TopicRequestModal } from './TopicRequestModal';

type TopicRequestButtonProps = {
    id: string;
    name: string;
};

export const TopicRequestButton = (props: TopicRequestButtonProps) => {
    const { id, name } = props;
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <>
            <BaseButton variant="contained" onClick={toggleOpen}>
                Оформить заявку
            </BaseButton>
            <TopicRequestModal open={open} onClose={toggleOpen} id={id} name={name} />
        </>
    );
};
