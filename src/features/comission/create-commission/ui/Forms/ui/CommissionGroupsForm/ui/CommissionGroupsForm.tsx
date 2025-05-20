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
import { getDefaultGroupsFormValues } from '../lib';
import { CommissionGroupsList } from './CommissionGroupsList';
import { CommissionGroupsSearch } from './CommissionGroupsSearch';

export const CommissionGroupsForm = memo(() => {
    const dispatch = useAppDispatch();
    const { data } = useSelector(getCommissionGroupsForm);
    const [query, setQuery] = useState('');

    const { control, getValues, reset } = useForm<GroupsFormSchema>({
        defaultValues: getDefaultGroupsFormValues(data),
        resolver: zodResolver(groupsFormSchema),
    });

    useEffect(() => {
        if (data) {
            reset(getDefaultGroupsFormValues(data));
        }
    }, [data, reset]);

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
