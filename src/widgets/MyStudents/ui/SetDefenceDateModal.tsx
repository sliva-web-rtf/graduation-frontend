import { useSnackbar } from '@/shared/lib/hooks/useSnackbar';
import { BaseAlert, BaseButton, BaseDatePicker, BaseField, BaseLoadingButton, BaseModal } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { useSetDefenceMutation } from '../api';
import { setDefenceFormSchema, SetDefenceFormSchema } from '../model';

type SetDefenceDateModalProps = {
    open: boolean;
    onClose: () => void;
    stage: string;
    selectedStudents: string[];
};

export const SetDefenceDateModal = (props: SetDefenceDateModalProps) => {
    const { open, onClose, stage, selectedStudents } = props;
    const { showSnackbar, Snackbar } = useSnackbar();
    const [setDefence, { isLoading }] = useSetDefenceMutation();
    const {
        reset,
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<SetDefenceFormSchema>({
        resolver: zodResolver(setDefenceFormSchema),
    });

    const onSubmit = (data: SetDefenceFormSchema) => {
        setDefence({
            stage,
            studentIds: selectedStudents,
            date: dayjs(data.date).format('YYYY-MM-DD'),
            location: data.location,
        })
            .unwrap()
            .then(() =>
                showSnackbar(
                    'success',
                    `Предзащита успешно назначена на ${dayjs(data.date).locale('ru').format('DD MMMM YYYY')}`,
                ),
            )
            .then(onClose)
            .then(() => reset())
            .catch(() => showSnackbar('error', 'Произошла ошибка при назначении предзащиты'));
    };

    return (
        <>
            <BaseModal
                size="small"
                open={open}
                onClose={onClose}
                title="Назначить дату предзащиты"
                cancelButton={<BaseButton variant="text">Отменить</BaseButton>}
                actionButton={
                    <BaseLoadingButton variant="contained" onClick={handleSubmit(onSubmit)} loading={isLoading}>
                        Назначить
                    </BaseLoadingButton>
                }
            >
                <Stack spacing={2}>
                    <Controller
                        control={control}
                        name="date"
                        render={({ field }) => (
                            <BaseDatePicker
                                autoFocus
                                {...field}
                                minDate={dayjs()}
                                slotProps={{
                                    textField: {
                                        error: Boolean(errors.date),
                                        helperText:
                                            errors.date?.message ??
                                            'Дата и время задается по Екатеринбургскому времени',
                                    },
                                }}
                            />
                        )}
                    />

                    <BaseField label="Место проведения предзащиты" multiline rows={3} {...register('location')} />
                    <BaseAlert severity="info">
                        Время назначается в колонке «Время предзащиты» для каждого студента
                    </BaseAlert>
                </Stack>
            </BaseModal>
            {Snackbar}
        </>
    );
};
