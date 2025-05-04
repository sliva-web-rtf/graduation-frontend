import { useGetAcademicGroupsQuery } from '@/entities/AcademicGroup';
import { BasePagination, EmptyMessage } from '@/shared/ui';
import { BaseCheckboxSkeletonList } from '@/shared/ui/Checkbox/Checkbox.skeleton';
import { FormControl, Stack } from '@mui/material';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { GroupsFormSchema } from '../../../../../model';
import { getGroupsChangeHandler } from '../lib';
import { GroupCheckbox } from './GroupCheckbox';

type CommissionGroupsListProps = {
    control: Control<GroupsFormSchema>;
    query: string;
};

const size = 10;
const defaultPage = 0;

export const CommissionGroupsList = memo((props: CommissionGroupsListProps) => {
    const { control, query } = props;
    const [page, setPage] = useState(defaultPage);

    const { data, isFetching } = useGetAcademicGroupsQuery({ query, size, page });

    const handleChangePage = useCallback((_: ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    }, []);

    useEffect(() => {
        setPage(defaultPage);
    }, [query]);

    if (isFetching) {
        return <BaseCheckboxSkeletonList count={size} />;
    }

    if (!data?.academicGroups?.length) {
        return <EmptyMessage />;
    }

    return (
        <Stack spacing={4} height="100%" justifyContent="space-between">
            <FormControl>
                <Controller
                    name="academicGroups"
                    control={control}
                    render={({ field }) => (
                        <Stack spacing={1}>
                            {data.academicGroups.map((item) => {
                                const checked = field.value?.some((group) => group.id === item.id);
                                const handleChange = getGroupsChangeHandler(field)(item);
                                const description = [
                                    item.academicProgram,
                                    item.blocked ? 'В другой комиссии' : '',
                                ].filter(Boolean);

                                return (
                                    <GroupCheckbox
                                        key={item.id}
                                        label={item.name}
                                        description={description}
                                        checked={checked}
                                        onChange={handleChange}
                                        disabled={item.blocked}
                                    />
                                );
                            })}
                        </Stack>
                    )}
                />
            </FormControl>
            <BasePagination page={page + 1} count={data.pagesCount} onChange={handleChangePage} />
        </Stack>
    );
});
