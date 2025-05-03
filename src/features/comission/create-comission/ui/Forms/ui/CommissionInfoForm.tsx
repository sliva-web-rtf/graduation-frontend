import { ExpertSelect } from '@/entities/Expert';
import { SecretarySelect } from '@/entities/Secretary';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseField } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputAdornment, Stack } from '@mui/material';
import { memo, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { commissionFormActions, getCommissionInfoForm, infoFormSchema, InfoFormSchema } from '../../../model';

export const CommissionInfoForm = memo(() => {
    const dispatch = useAppDispatch();
    const { data, isTouched } = useSelector(getCommissionInfoForm);

    const {
        control,
        formState: { errors },
        getValues,
        register,
        trigger,
        setValue,
    } = useForm<InfoFormSchema>({
        defaultValues: { ...data, number: data?.number ?? 0, name: `Комиссия №${data?.number ?? 0}` },
        resolver: zodResolver(infoFormSchema),
    });

    const number = useWatch({
        control,
        name: 'number',
    });

    useEffect(() => {
        if (number) {
            setValue('name', `Комиссия №${number}`, { shouldValidate: true });
        }
    }, [number, setValue]);

    useEffect(() => {
        if (isTouched) {
            trigger();
        }
    }, [isTouched, trigger]);

    useEffect(() => {
        return () => {
            dispatch(commissionFormActions.updateInfoForm(getValues()));
        };
    }, [dispatch, getValues]);

    return (
        <Stack spacing={2} component="form">
            <Stack direction="row" spacing={2}>
                <BaseField
                    autoFocus
                    sx={{ width: 120 }}
                    label="Номер"
                    type="number"
                    {...register('number', { valueAsNumber: true })}
                    error={Boolean(errors.number)}
                    helperText={errors.number?.message}
                    InputProps={{
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start">№</InputAdornment>,
                    }}
                />
                <BaseField
                    sx={{ flex: 1 }}
                    label="Название комиссии"
                    rows={3}
                    {...register('name')}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                />
            </Stack>

            <Controller
                name="secretary"
                control={control}
                render={({ field, fieldState }) => (
                    <SecretarySelect
                        label="Ответственный секретарь"
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        {...field}
                    />
                )}
            />

            <Controller
                name="chairperson"
                control={control}
                render={({ field, fieldState }) => (
                    <ExpertSelect
                        label="Председатель комиссии"
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        {...field}
                    />
                )}
            />
        </Stack>
    );
});
