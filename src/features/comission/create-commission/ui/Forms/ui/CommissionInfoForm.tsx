import { ExpertSelect } from '@/entities/Expert';
import { SecretarySelect } from '@/entities/Secretary';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseField } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { memo, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
    } = useForm<InfoFormSchema>({
        defaultValues: data ?? {},
        resolver: zodResolver(infoFormSchema),
    });

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
            <BaseField
                sx={{ flex: 1 }}
                label="Название комиссии"
                rows={3}
                {...register('name')}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
            />

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
