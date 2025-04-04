import { BaseModal } from '@/shared/ui';
import { Typography } from '@mui/material';

type ComissionStudentsModalProps = {
    comissionId: string;
    comissionName: string;
    open: boolean;
    onClose: () => void;
};

export const CheckStudentsModal = (props: ComissionStudentsModalProps) => {
    const { comissionId, comissionName, open, onClose } = props;

    return (
        <BaseModal open={open} onClose={onClose} title={`Студенты из "${comissionName}"`}>
            <Typography>Студенты</Typography>
        </BaseModal>
    );
};
