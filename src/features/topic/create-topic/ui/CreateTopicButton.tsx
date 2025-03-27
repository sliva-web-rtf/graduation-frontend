import { useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { BaseButton } from '@/shared/ui';
import { CreateTopicModal } from './CreateTopicModal';

export const CreateTopicButton = () => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <>
            <BaseButton sx={{ py: 1, px: 3 }} variant="shadowed" startIcon={<AddRoundedIcon />} onClick={toggleOpen}>
                Создать тему
            </BaseButton>
            <CreateTopicModal open={open} onClose={toggleOpen} />
        </>
    );
};
