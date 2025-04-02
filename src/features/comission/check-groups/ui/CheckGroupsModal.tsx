import { BaseModal } from '@/shared/ui';
import { Typography } from '@mui/material';

type CheckGroupsModalProps = {
    comissionId: string;
    comissionName: string;
    open: boolean;
    onClose: () => void;
};

export const CheckGroupsModal = (props: CheckGroupsModalProps) => {
    const { comissionId, comissionName, open, onClose } = props;

    return (
        <BaseModal open={open} onClose={onClose} title={`Группы из "${comissionName}"`}>
            <Typography>Группы</Typography>
        </BaseModal>
    );
};
