import { BaseButton } from '@/shared/ui';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useState } from 'react';
import { CreateTopicModal } from './CreateTopicModal';

export const CreateTopicButton = () => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <>
            <BaseButton variant="contained" startIcon={<AddRoundedIcon />} onClick={toggleOpen}>
                Создать тему
            </BaseButton>
            <CreateTopicModal open={open} onClose={toggleOpen} />
        </>
    );
};
