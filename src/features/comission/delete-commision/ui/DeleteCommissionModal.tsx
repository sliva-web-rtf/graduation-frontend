import { useSnackbar } from '@/shared/lib/hooks/useSnackbar';
import { BaseAlert, BaseButton, BaseField, BaseLoadingButton, BaseModal } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { MouseEvent, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDeleteCommissionMutation } from '../api';
import { createDeleteCommissionSchema, DeleteCommissionSchema } from '../model';

type DeleteCommissionModalProps = {
    open: boolean;
    onClose: (event: MouseEvent<HTMLElement>) => void;
    commissionId: string;
    commissionName: string;
};

export const DeleteCommissionModal = (props: DeleteCommissionModalProps) => {
    const { open, onClose, commissionId, commissionName } = props;
    const { showSnackbar, Snackbar } = useSnackbar();

    const {
        formState: { errors, isValid },
        trigger,
        register,
    } = useForm<DeleteCommissionSchema>({
        resolver: zodResolver(createDeleteCommissionSchema(commissionName)),
    });

    const [deleteCommission, { isLoading }] = useDeleteCommissionMutation();

    const handleDelete = useCallback(
        (event: MouseEvent<HTMLElement>) => {
            trigger();

            if (!isValid) {
                return;
            }

            deleteCommission({ id: commissionId })
                .unwrap()
                .then(() => onClose(event))
                .catch((error) => showSnackbar('error', error.message));
        },
        [commissionId, deleteCommission, isValid, onClose, showSnackbar, trigger],
    );

    return (
        <BaseModal
            onClick={(event) => event.stopPropagation()}
            size="small"
            open={open}
            onClose={onClose}
            title="Удаление комиссии"
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
                    Вы уверены, что хотите удалить комиссию?
                    <br />
                    Отменить это действие будет невозможно
                </BaseAlert>

                <BaseField
                    {...register('confirmation')}
                    label="Подтверждение удаления"
                    placeholder={commissionName}
                    error={Boolean(errors.confirmation)}
                    helperText={errors.confirmation?.message ?? `Введите <${commissionName}> для подтверждения`}
                />
                {Snackbar}
            </Stack>
        </BaseModal>
    );
};
