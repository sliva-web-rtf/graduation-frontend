import { useSetDefaultYearMutation } from '@/entities/Year';
import { BaseAlert, BaseButton, BaseLoadingButton, BaseModal } from '@/shared/ui';
import { Stack, Typography } from '@mui/material';

type DefaultYearConfirmModalProps = {
    year: string;
    open: boolean;
    onClose: () => void;
    showSnackbar: (severity: 'success' | 'error', message: string) => void;
};

export const DefaultYearConfirmModal = (props: DefaultYearConfirmModalProps) => {
    const { year, open, onClose, showSnackbar } = props;
    const [setDefaultYear, { isLoading }] = useSetDefaultYearMutation();

    const handleSetDefaultYear = () => {
        setDefaultYear({ year })
            .unwrap()
            .then(onClose)
            .then(() => showSnackbar('success', 'Учебный год по умолчанию успешно установлен'))
            .catch(() => showSnackbar('error', 'Не удалось установить учебный год по умолчанию'));
    };

    return (
        <BaseModal
            size="small"
            title="Установка учебного года по умолчанию"
            open={open}
            onClose={onClose}
            cancelButton={
                <BaseButton variant="text" onClick={onClose}>
                    Отменить
                </BaseButton>
            }
            actionButton={
                <BaseLoadingButton loading={isLoading} variant="contained" onClick={handleSetDefaultYear}>
                    Установить
                </BaseLoadingButton>
            }
        >
            <Stack spacing={2}>
                <BaseAlert severity="warning">Проверьте верно ли выбран учебный год</BaseAlert>
                <Stack direction="row" spacing={1}>
                    <Typography>Учебный год:</Typography>
                    <Typography color="primary">{year}</Typography>
                </Stack>
            </Stack>
        </BaseModal>
    );
};
