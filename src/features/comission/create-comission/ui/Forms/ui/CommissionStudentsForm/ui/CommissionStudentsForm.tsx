import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
    commissionFormActions,
    getCommissionStudentsForm,
    studentsFormSchema,
    StudentsFormSchema,
} from '../../../../../model';
import { CommissionStudentsList } from './CommissionStudentsList';
import { CommissionStudentsSearch } from './CommissionStudentsSearch';

type CommissionStudentsFormProps = {
    stages?: string[];
};

export const CommissionStudentsForm = memo((props: CommissionStudentsFormProps) => {
    const { stages } = props;
    const dispatch = useAppDispatch();
    const { data, isTouched } = useSelector(getCommissionStudentsForm);
    const [stage, setStage] = useState(stages?.[0] || '');
    const [query, setQuery] = useState('');

    const { control, getValues } = useForm<StudentsFormSchema>({
        defaultValues: data || { students: [] },
        resolver: zodResolver(studentsFormSchema),
    });

    useEffect(() => {
        return () => {
            dispatch(commissionFormActions.updateStudentsForm(getValues()));
        };
    }, [dispatch, getValues, isTouched]);

    return (
        <Stack spacing={4} height="100%">
            <CommissionStudentsSearch query={query} onQueryChange={setQuery} />
            <CommissionStudentsList control={control} query={query} stage={stage} />
        </Stack>
    );
});
