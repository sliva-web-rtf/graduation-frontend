import { BaseAlert, BaseButton, BaseDatePicker, BaseModal } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { setDefenceFormSchema, SetDefenceFormSchema } from '../model';

type SetDefenceDateModalProps = {
    open: boolean;
    onClose: () => void;
    items: unknown[];
};

export const SetDefenceDateModal = (props: SetDefenceDateModalProps) => {
    const { open, onClose, items } = props;
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<SetDefenceFormSchema>({
        resolver: zodResolver(setDefenceFormSchema),
    });

    const onSubmit = (data: SetDefenceFormSchema) => {
        alert(dayjs(data.date).format('DD-MM-YYYY'));
    };

    return (
        <BaseModal
            size="small"
            open={open}
            onClose={onClose}
            title="Назначить дату предзащиты"
            cancelButton={<BaseButton variant="text">Отменить</BaseButton>}
            actionButton={
                <BaseButton type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
                    Назначить
                </BaseButton>
            }
        >
            <Stack spacing={2}>
                <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                        <BaseDatePicker
                            {...field}
                            minDate={dayjs()}
                            slotProps={{ textField: { error: Boolean(errors.date), helperText: errors.date?.message } }}
                        />
                    )}
                />

                <BaseAlert severity="info">
                    Время назначается в колонке «Время предзащиты» для каждого студента
                </BaseAlert>
            </Stack>
        </BaseModal>
    );
};
