import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { commissionFormActions, expertsFormSchema, ExpertsFormSchema } from '../../../../../model';
import { getCommissionExpertsForm } from '../../../../../model/selectors';
import { ToggleStage } from '../../ToggleStage';
import { CommissionExpertsList } from './CommissionExpertsList';
import { CommissionExpertsSearch } from './CommissionExpertsSearch';

type CommissionExpertsFormProps = {
    stages?: string[];
};

export const CommissionExpertsForm = memo((props: CommissionExpertsFormProps) => {
    const { stages } = props;
    const dispatch = useAppDispatch();
    const { data } = useSelector(getCommissionExpertsForm);
    const [stage, setStage] = useState(stages?.[0] || '');
    const [query, setQuery] = useState('');

    const defaultValues: ExpertsFormSchema = useMemo(
        () =>
            stages?.reduce((acc, st) => {
                acc[st] = data?.[st] ?? [];

                return acc;
            }, {} as ExpertsFormSchema) ?? {},
        [data, stages],
    );

    const { control, getValues } = useForm<ExpertsFormSchema>({
        defaultValues,
        resolver: zodResolver(expertsFormSchema),
    });

    const handleChangeStage = useCallback((stage: string) => {
        setStage(stage);
    }, []);

    useEffect(() => {
        return () => {
            dispatch(commissionFormActions.updateExpertsForm(getValues()));
        };
    }, [dispatch, getValues]);

    return (
        <Stack spacing={4} height="100%">
            <CommissionExpertsSearch query={query} onQueryChange={setQuery} />
            <ToggleStage value={stage} options={stages} onChange={handleChangeStage} />
            <CommissionExpertsList query={query} name={stage} control={control} />
        </Stack>
    );
});
