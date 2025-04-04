import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseField, BaseSelect } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { commissionFormActions, getCommissionInfoForm, infoFormSchema, InfoFormSchema } from '../../../model';

export const CommissionInfoForm = memo(() => {
    const dispatch = useAppDispatch();
    const { data, isTouched } = useSelector(getCommissionInfoForm);
    const {
        control,
        formState: { errors },
        getValues,
        reset,
        register,
        trigger,
    } = useForm<InfoFormSchema>({
        defaultValues: data || {},
        resolver: zodResolver(infoFormSchema),
    });

    useEffect(() => {
        if (data) {
            reset(data);
        }

        if (isTouched) {
            trigger();
        }
    }, [isTouched, trigger, data, reset]);

    useEffect(() => {
        return () => {
            dispatch(commissionFormActions.updateInfoForm(getValues()));
        };
    }, [dispatch, getValues]);

    return (
        <Stack spacing={2} component="form">
            <BaseField
                type="number"
                label="Порядковый номер"
                {...register('number', {
                    setValueAs: (value) => (!value ? undefined : Number(value)),
                })}
                error={Boolean(errors.number)}
                helperText={errors.number?.message}
            />
            <BaseField
                label="Название комиссии"
                multiline
                rows={3}
                {...register('name')}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
            />
            <BaseSelect
                name="clerk"
                control={control}
                options={['Иванов', 'Миронова']}
                label="Ответственный секретарь"
                error={Boolean(errors.clerk)}
                helperText={errors.clerk?.message}
            />
        </Stack>
    );
});
