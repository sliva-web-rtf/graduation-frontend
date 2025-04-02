import { BaseButton } from '@/shared/ui';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { useState } from 'react';
import { DocumentUploadModal } from './DocumentUploadModal';

type DocumentUploadButtonProps = {
    name: string;
};

export const DocumentUploadButton = (props: DocumentUploadButtonProps) => {
    const { name } = props;
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <>
            <BaseButton size="small" variant="contained" startIcon={<AttachFileOutlinedIcon />} onClick={toggleOpen}>
                Прикрепить
            </BaseButton>
            <DocumentUploadModal open={open} onClose={toggleOpen} name={name} />
        </>
    );
};
