import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
    commissionFormActions,
    getCommissionGroupsForm,
    groupsFormSchema,
    GroupsFormSchema,
} from '../../../../../model';
import { CommissionGroupsList } from './CommissionGroupsList';
import { CommissionGroupsSearch } from './CommissionGroupsSearch';

export const CommissionGroupsForm = memo(() => {
    const dispatch = useAppDispatch();
    const { data } = useSelector(getCommissionGroupsForm);
    const [query, setQuery] = useState('');

    const { control, getValues } = useForm<GroupsFormSchema>({
        defaultValues: data || { academicGroups: [] },
        resolver: zodResolver(groupsFormSchema),
    });

    useEffect(() => {
        return () => {
            dispatch(commissionFormActions.updateGroupsForm(getValues()));
        };
    }, [dispatch, getValues]);

    return (
        <Stack spacing={4} height="100%">
            <CommissionGroupsSearch query={query} onQueryChange={setQuery} />
            <CommissionGroupsList control={control} query={query} />
        </Stack>
    );
});
