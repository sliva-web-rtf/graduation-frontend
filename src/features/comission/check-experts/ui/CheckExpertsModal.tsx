import { BaseModal } from '@/shared/ui';
import { Typography } from '@mui/material';

type CheckExpertsModalProps = {
    comissionId: string;
    comissionName: string;
    open: boolean;
    onClose: () => void;
};

export const CheckExpertsModal = (props: CheckExpertsModalProps) => {
    const { comissionId, comissionName, open, onClose } = props;

    return (
        <BaseModal open={open} onClose={onClose} title={`Эксперты из "${comissionName}"`}>
            <Typography>Эксперты</Typography>
        </BaseModal>
    );
};
