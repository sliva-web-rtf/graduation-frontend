import { ComissionSelect } from '@/entities/Comission';
import { BaseAlert, BaseButton, BaseModal } from '@/shared/ui';
import CancelIcon from '@mui/icons-material/Cancel';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import { SelectChangeEvent, Stack } from '@mui/material';
import { useCallback, useState } from 'react';

type StudentTransferModalProps = {
    studentName: string;
    onCommissionChange: (commissionId: string) => void;
    currentCommissionId: string | null;
};

const defaultComissionId = 'null';

export const StudentTransferModal = (props: StudentTransferModalProps) => {
    const { studentName, onCommissionChange, currentCommissionId } = props;
    const [open, setOpen] = useState(false);
    const [comissionId, setComissionId] = useState<string | null>(currentCommissionId);

    // const { data: comissionName, isFetching } = useGetComissionNameQuery(
    //     { id: currentCommissionId! },
    //     { skip: !currentCommissionId },
    // );

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = useCallback((event: SelectChangeEvent<unknown>) => {
        setComissionId(event.target.value as string);
    }, []);

    const handleSubmit = useCallback(() => {
        if (comissionId === defaultComissionId) {
            onCommissionChange(defaultComissionId);
        }

        onCommissionChange(comissionId as string);
        handleClose();
    }, [comissionId, onCommissionChange]);

    const buttonColor = currentCommissionId ? 'secondary' : 'primary';
    const buttonText = currentCommissionId ? `Переведен ` : 'Перевести';
    const buttonIcon = currentCommissionId ? <HowToRegIcon /> : <MoveDownIcon />;

    return (
        <>
            <BaseButton variant="text" color={buttonColor} startIcon={buttonIcon} onClick={handleOpen}>
                {buttonText}
            </BaseButton>
            <BaseModal
                size="small"
                open={open}
                onClose={handleClose}
                title="Выберите комиссию для перемещения студента"
                actionButton={
                    <BaseButton variant="text" startIcon={<MoveDownIcon />} onClick={handleSubmit}>
                        Переместить
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
                        Вы собираетесь переместить студента <b>{studentName}</b> в другую комиссию
                    </BaseAlert>
                    <ComissionSelect
                        onChange={handleChange}
                        value={comissionId}
                        clearText="Восстановить по умолчанию"
                        clearValue={defaultComissionId}
                    />
                </Stack>
            </BaseModal>
        </>
    );
};
