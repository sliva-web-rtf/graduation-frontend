import { BaseButton } from '@/shared/ui';
import { memo, useState } from 'react';
import { SetDefenceDateModal } from './SetDefenceDateModal';

type SetDefenceDateButtonProps = {
    items: unknown[];

    disabled?: boolean;
};

export const SetDefenceDateButton = memo((props: SetDefenceDateButtonProps) => {
    const { items, disabled } = props;
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            <BaseButton size="small" variant="contained" onClick={toggleOpen} disabled={disabled}>
                Назначить предзащиту
            </BaseButton>
            <SetDefenceDateModal open={open} onClose={toggleOpen} items={items} />
        </>
    );
});
