import { useCopyStageMutation } from '@/entities/Stage';
import { useSnackbar } from '@/shared/lib/hooks/useSnackbar';
import { BaseAlert, BaseButton, BaseLoadingButton, BaseModal } from '@/shared/ui';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import MoveDownOutlinedIcon from '@mui/icons-material/MoveDownOutlined';
import { Stack, Typography } from '@mui/material';

type StageCopyModalProps = {
    open: boolean;
    onClose: () => void;
    fromStage: string | null;
    toStage: string | null;
    disabled: boolean;
};

export const StageCopyModal = (props: StageCopyModalProps) => {
    const { open, onClose, fromStage, toStage, disabled } = props;

    const [copyStage, { isLoading }] = useCopyStageMutation();
    const { showSnackbar, Snackbar } = useSnackbar();

    const fromText = ` ${fromStage || 'не выбран'} `;
    const toText = ` ${toStage || 'не выбран'} `;

    const handleCopy = () => {
        copyStage({ fromStage: fromStage!, toStage: toStage! })
            .unwrap()
            .then(() => {
                showSnackbar('success', 'Данные успешно скопированы');
            })
            .then(onClose)
            .catch((error) => {
                showSnackbar('error', error.message);
            });
    };

    return (
        <>
            <BaseModal
                size="small"
                open={open}
                onClose={onClose}
                title="Копирование данных этапа"
                actionButton={
                    <BaseLoadingButton
                        variant="text"
                        startIcon={<MoveDownOutlinedIcon />}
                        onClick={handleCopy}
                        loading={isLoading}
                        disabled={disabled}
                    >
                        Копировать
                    </BaseLoadingButton>
                }
                cancelButton={
                    <BaseButton variant="contained" startIcon={<CancelOutlinedIcon />} onClick={onClose}>
                        Отменить
                    </BaseButton>
                }
            >
                <Stack spacing={2}>
                    <BaseAlert severity="warning">Проверьте верно ли выбраны этапы</BaseAlert>
                    <Typography>
                        Копирование данных из
                        <Typography component="span" fontWeight={600} color="primary">
                            {fromText}
                        </Typography>
                        в
                        <Typography component="span" fontWeight={600} color="primary">
                            {toText}
                        </Typography>
                    </Typography>
                </Stack>
            </BaseModal>
            {Snackbar}
        </>
    );
};
