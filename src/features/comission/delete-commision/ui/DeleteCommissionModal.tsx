import { useSnackbar } from '@/shared/lib/hooks/useSnackbar';
import { BaseAlert, BaseButton, BaseLoadingButton, BaseModal } from '@/shared/ui';
import { Stack } from '@mui/material';
import { MouseEvent, useCallback } from 'react';
import { useDeleteCommissionMutation } from '../api';

type DeleteCommissionModalProps = {
    open: boolean;
    onClose: (event: MouseEvent<HTMLElement>) => void;
    commissionId: string;
    commissionName: string;
};

export const DeleteCommissionModal = (props: DeleteCommissionModalProps) => {
    const { open, onClose, commissionId, commissionName } = props;
    const { showSnackbar, Snackbar } = useSnackbar();
    const [deleteCommission, { isLoading }] = useDeleteCommissionMutation();

    const handleDelete = useCallback(
        (event: MouseEvent<HTMLElement>) => {
            deleteCommission({ id: commissionId })
                .unwrap()
                .then(() => onClose(event))
                .catch(() => showSnackbar('error', 'Произошла ошибка при удалении комиссии'));
        },
        [commissionId, deleteCommission, onClose, showSnackbar],
    );

    return (
        <BaseModal
            onClick={(event) => event.stopPropagation()}
            size="small"
            open={open}
            onClose={onClose}
            title="Подтвердите удаление комиссии"
            actionButton={
                <BaseLoadingButton loading={isLoading} variant="text" onClick={handleDelete}>
                    Удалить
                </BaseLoadingButton>
            }
            cancelButton={
                <BaseButton variant="contained" onClick={onClose}>
                    Отменить
                </BaseButton>
            }
        >
            <Stack spacing={2}>
                <BaseAlert severity="warning">
                    Вы уверены, что хотите удалить комиссию <b>&quot;{commissionName}&quot;</b>? Отменить это действие
                    будет невозможно
                </BaseAlert>
                {Snackbar}
            </Stack>
        </BaseModal>
    );
};
