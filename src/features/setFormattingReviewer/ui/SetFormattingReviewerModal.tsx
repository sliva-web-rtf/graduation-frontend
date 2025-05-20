import { FormattingReviewerSelect } from '@/entities/FormattingReviewer';
import { getInitials } from '@/shared/lib/helpers/getInitials';
import { useSnackbar } from '@/shared/lib/hooks/useSnackbar';
import { BaseAlert, BaseButton, BaseLoadingButton, BaseModal } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import CancelIcon from '@mui/icons-material/Cancel';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Stack, Tooltip } from '@mui/material';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSetFormattingReviewerMutation } from '../api';
import { getFormattingReviewerDefaultValues } from '../lib';
import { formattingReviewerSchema, FormattingReviewerSchema } from '../model';

type SetFormattingReviewerModalProps = {
    academicGroupId: string;
    academicGroupName: string;
    formattingReviewerId?: string | null;
    formattingReviewerName?: string | null;
};

export const SetFormattingReviewerModal = (props: SetFormattingReviewerModalProps) => {
    const { academicGroupId, academicGroupName, formattingReviewerId, formattingReviewerName } = props;
    const [open, setOpen] = useState(false);

    const buttonColor = formattingReviewerId ? 'secondary' : 'primary';
    const buttonText = formattingReviewerName ? getInitials(formattingReviewerName) : 'Нормоконтролер';
    const tooltipTitle = formattingReviewerName ? `Нормоконтролер – ${formattingReviewerName}` : '';
    const buttonIcon = formattingReviewerId ? <HowToRegIcon /> : <PersonAddAlt1Icon />;

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<FormattingReviewerSchema>({
        defaultValues: getFormattingReviewerDefaultValues(formattingReviewerId, formattingReviewerName),
        resolver: zodResolver(formattingReviewerSchema),
    });

    const { showSnackbar, Snackbar } = useSnackbar();
    const [setFormattingReviewer, { isLoading }] = useSetFormattingReviewerMutation();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = useCallback(
        (data: FormattingReviewerSchema) => {
            setFormattingReviewer({
                academicGroupId,
                formattingReviewerId: data.formattingReviewer.id,
            })
                .unwrap()
                .then(handleClose)
                .catch((error) => {
                    showSnackbar('error', error.message);
                });
        },
        [academicGroupId, setFormattingReviewer, showSnackbar],
    );

    return (
        <>
            <Tooltip title={tooltipTitle}>
                <BaseButton
                    variant="text"
                    color={buttonColor}
                    startIcon={buttonIcon}
                    onClick={handleOpen}
                    sx={{ padding: '0 16px 0 0 !important', whiteSpace: 'nowrap' }}
                >
                    {buttonText}
                </BaseButton>
            </Tooltip>
            <BaseModal
                size="small"
                open={open}
                onClose={handleClose}
                title="Выберите комиссию для перевода студента"
                actionButton={
                    <BaseLoadingButton
                        variant="text"
                        startIcon={<PersonAddAlt1Icon />}
                        onClick={handleSubmit(onSubmit)}
                        loading={isLoading}
                        disabled={!isValid}
                    >
                        Назначить
                    </BaseLoadingButton>
                }
                cancelButton={
                    <BaseButton variant="contained" startIcon={<CancelIcon />} onClick={handleClose}>
                        Отменить
                    </BaseButton>
                }
            >
                <Stack spacing={2}>
                    <BaseAlert severity="info">
                        Вы собираетесь назначить нормоконтролера для группы <b>{academicGroupName}</b>
                    </BaseAlert>
                    <Controller
                        name="formattingReviewer"
                        control={control}
                        render={({ field, fieldState }) => (
                            <FormattingReviewerSelect
                                label="Нормоконтролер"
                                error={fieldState.invalid}
                                helperText={fieldState.error?.message}
                                {...field}
                            />
                        )}
                    />
                    {Snackbar}
                </Stack>
            </BaseModal>
        </>
    );
};
