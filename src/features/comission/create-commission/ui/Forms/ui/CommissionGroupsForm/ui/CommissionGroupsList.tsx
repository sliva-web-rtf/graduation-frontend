import { useGetAcademicGroupsQuery } from '@/entities/AcademicGroup';
import { useEditCommissionContext } from '@/features/comission/edit-commision';
import { BasePagination, EmptyMessage } from '@/shared/ui';
import { BaseCheckboxSkeletonList } from '@/shared/ui/Checkbox/Checkbox.skeleton';
import { FormControl, Stack } from '@mui/material';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { GroupsFormSchema } from '../../../../../model';
import { getGroupsChangeHandler, getGroupsDescription } from '../lib';
import { GroupCheckbox } from './GroupCheckbox';

type CommissionGroupsListProps = {
    control: Control<GroupsFormSchema>;
    query: string;
};

const size = 10;
const defaultPage = 0;

export const CommissionGroupsList = memo((props: CommissionGroupsListProps) => {
    const { control, query } = props;
    const editContext = useEditCommissionContext();
    const [page, setPage] = useState(defaultPage);

    const commissionId = editContext?.commissionId ?? null;
    const { data, isFetching } = useGetAcademicGroupsQuery({
        query,
        size,
        page,
        commissionId,
    });

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
                                const description = getGroupsDescription(item);

                                return (
                                    <GroupCheckbox
                                        key={item.id}
                                        value={item.id}
                                        label={item.name}
                                        description={description}
                                        checked={checked}
                                        onChange={handleChange}
                                        disabled={item.blocked}
                                        formattingReviewerId={item.formattingReviewerId}
                                        formattingReviewerName={item.formattingReviewerName}
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
