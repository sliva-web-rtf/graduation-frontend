import { useGetAcademicGroupsQuery } from '@/entities/AcademicGroup';
import { BaseCheckbox, BasePagination, EmptyMessage } from '@/shared/ui';
import { BaseCheckboxSkeletonList } from '@/shared/ui/Checkbox/Checkbox.skeleton';
import { FormControl, Stack } from '@mui/material';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { getCheckboxChangeHandler } from '../../../../../lib';
import { GroupsFormSchema } from '../../../../../model';

type CommissionGroupsListProps = {
    control: Control<GroupsFormSchema>;
    query: string;
};

const size = 10;

export const CommissionGroupsList = memo((props: CommissionGroupsListProps) => {
    const { control, query } = props;
    const [page, setPage] = useState(0);

    const { data, isFetching } = useGetAcademicGroupsQuery({ query, size, page });

    const handleChangePage = useCallback((_: ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    }, []);

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
                                const handleChange = getCheckboxChangeHandler(field)(item.id);
                                const description = [
                                    item.academicProgram,
                                    item.blocked ? 'В другой комиссии' : '',
                                ].filter(Boolean);

                                return (
                                    <BaseCheckbox
                                        key={item.id}
                                        label={item.name}
                                        value={item.id}
                                        description={description}
                                        checked={field.value?.includes(item.id)}
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
