import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
    commissionFormActions,
    getCommissionGroupsForm,
    getCommissionStudentsForm,
    studentsFormSchema,
    StudentsFormSchema,
} from '../../../../../model';
import { ToggleStage } from '../../ToggleStage';
import { getDefaultStudentsFormValues } from '../lib';
import { CommissionStudentsGroupsList } from './CommissionStudentsGroupsList';
import { CommissionStudentsList } from './CommissionStudentsList';
import { CommissionStudentsSearch } from './CommissionStudentsSearch';

type CommissionStudentsFormProps = {
    stages?: string[];
};

export const CommissionStudentsForm = memo((props: CommissionStudentsFormProps) => {
    const { stages } = props;
    const dispatch = useAppDispatch();

    const { data, isTouched } = useSelector(getCommissionStudentsForm);
    const { data: groupsFormData } = useSelector(getCommissionGroupsForm);
    const academicGroups = groupsFormData?.academicGroups?.map((group) => group.name);

    const [stage, setStage] = useState(stages?.[0] || '');
    const [query, setQuery] = useState('');

    const { control, getValues } = useForm<StudentsFormSchema>({
        defaultValues: getDefaultStudentsFormValues(stages, data),
        resolver: zodResolver(studentsFormSchema),
    });

    useEffect(() => {
        return () => {
            dispatch(commissionFormActions.updateStudentsForm(getValues()));
        };
    }, [dispatch, getValues, isTouched]);

    return (
        <Stack spacing={4} height="100%">
            <ToggleStage options={stages} value={stage} onChange={setStage} />
            <Stack spacing={1}>
                <CommissionStudentsGroupsList academicGroups={academicGroups} />
                <CommissionStudentsSearch query={query} onQueryChange={setQuery} />
            </Stack>
            <CommissionStudentsList control={control} query={query} stage={stage} academicGroups={academicGroups} />
        </Stack>
    );
});
