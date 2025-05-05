import { ComissionSelect } from '@/entities/Comission';
import { BaseAlert, BaseButton, BaseModal } from '@/shared/ui';
import CancelIcon from '@mui/icons-material/Cancel';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import { SelectChangeEvent, Stack, Tooltip } from '@mui/material';
import { useCallback, useState } from 'react';
import { CommissionChangePayload } from '../lib';

type StudentTransferModalProps = {
    studentName: string;
    onCommissionChange: (payload: CommissionChangePayload) => void;
    currentCommissionId: string | null;
    currentCommissionName?: string | null;
};

const defaultComissionId = 'null';

export const StudentTransferModal = (props: StudentTransferModalProps) => {
    const { studentName, onCommissionChange, currentCommissionId, currentCommissionName } = props;
    const [open, setOpen] = useState(false);
    const [commissionId, setCommissionId] = useState<string | null>(currentCommissionId);
    const [commissionName, setCommissionName] = useState<string | null | undefined>(currentCommissionName);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = useCallback((event: SelectChangeEvent<unknown>, item: any) => {
        setCommissionId(event.target.value as string);
        setCommissionName(item.props.children);
    }, []);

    const handleSubmit = useCallback(() => {
        onCommissionChange({ commissionId, commissionName });
        handleClose();
    }, [commissionId, onCommissionChange, commissionName]);

    const buttonColor = currentCommissionId ? 'secondary' : 'primary';
    const buttonText = currentCommissionName || 'Перевести';
    const tooltipTitle = currentCommissionName
        ? `Переведен в "${currentCommissionName}"`
        : 'Перевести в другую комиссию';
    const buttonIcon = currentCommissionId ? <HowToRegIcon /> : <MoveDownIcon />;

    return (
        <>
            <Tooltip title={tooltipTitle}>
                <BaseButton variant="text" color={buttonColor} startIcon={buttonIcon} onClick={handleOpen}>
                    {buttonText}
                </BaseButton>
            </Tooltip>
            <BaseModal
                size="small"
                open={open}
                onClose={handleClose}
                title="Выберите комиссию для перевода студента"
                actionButton={
                    <BaseButton variant="text" startIcon={<MoveDownIcon />} onClick={handleSubmit}>
                        Перевести
                    </BaseButton>
                }
                cancelButton={
                    <BaseButton variant="contained" startIcon={<CancelIcon />} onClick={handleClose}>
                        Отменить
                    </BaseButton>
                }
            >
                <Stack spacing={2}>
                    <BaseAlert severity="warning">
                        Вы собираетесь перевести студента <b>{studentName}</b> в другую комиссию
                    </BaseAlert>
                    <ComissionSelect
                        onChange={handleChange}
                        value={commissionId}
                        commissionName={commissionName}
                        clearText="Восстановить по умолчанию"
                        clearValue={defaultComissionId}
                    />
                </Stack>
            </BaseModal>
        </>
    );
};
