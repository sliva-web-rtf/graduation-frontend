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
    editCommissionId?: string | null;

    disabled?: boolean;
};

const defaultComissionId = 'null';
const defaultComissionName = 'Восстановить по умолчанию';

export const StudentTransferModal = (props: StudentTransferModalProps) => {
    const { studentName, onCommissionChange, currentCommissionId, currentCommissionName, editCommissionId, disabled } =
        props;
    const [open, setOpen] = useState(false);
    const [commissionId, setCommissionId] = useState<string | null>(currentCommissionId);
    const [commissionName, setCommissionName] = useState<string | null | undefined>(currentCommissionName);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = useCallback(
        (event: SelectChangeEvent<unknown>, item: any) => {
            const newCommissionId = event.target.value as string;
            if (editCommissionId && newCommissionId === editCommissionId) {
                setCommissionId(defaultComissionId);
                setCommissionName(defaultComissionName);

                return;
            }

            setCommissionId(event.target.value as string);
            setCommissionName(item.props.children);
        },
        [editCommissionId],
    );

    const handleSubmit = useCallback(() => {
        onCommissionChange({ commissionId, commissionName });
        handleClose();
    }, [commissionId, onCommissionChange, commissionName]);

    const buttonText = currentCommissionName || 'Перевести';
    const tooltipTitle = currentCommissionName
        ? `Переведен в "${currentCommissionName}"`
        : 'Перевести в другую комиссию';
    const buttonIcon = currentCommissionId ? <HowToRegIcon /> : <MoveDownIcon />;

    return (
        <>
            <Tooltip title={tooltipTitle}>
                <span>
                    <BaseButton
                        component="span"
                        variant="text"
                        color="primary"
                        startIcon={buttonIcon}
                        onClick={handleOpen}
                        disabled={disabled}
                        sx={{ padding: '0 16px 0 0 !important', whiteSpace: 'nowrap' }}
                    >
                        {buttonText}
                    </BaseButton>
                </span>
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
                        clearValue={defaultComissionId}
                        clearText={defaultComissionName}
                        excludedValue={editCommissionId}
                    />
                </Stack>
            </BaseModal>
        </>
    );
};
