import { useGetStudentsQuery } from '@/entities/Student';
import { BaseCheckbox, BasePagination, EmptyMessage } from '@/shared/ui';
import { BaseCheckboxSkeletonList } from '@/shared/ui/Checkbox/Checkbox.skeleton';
import { FormControl, Stack } from '@mui/material';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { getCheckboxChangeHandler } from '../../../../../lib';
import { StudentsFormSchema } from '../../../../../model';

type CommissionStudentsListProps = {
    stage: string;
    control: Control<StudentsFormSchema>;
    query: string;
};

const size = 10;

export const CommissionStudentsList = memo((props: CommissionStudentsListProps) => {
    const { stage, control, query } = props;
    const [page, setPage] = useState(0);

    const { data, isFetching } = useGetStudentsQuery({ query, size, page, stage });

    const handleChangePage = useCallback((_: ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    }, []);

    if (isFetching) {
        return <BaseCheckboxSkeletonList count={size} />;
    }

    if (!data?.students?.length) {
        return <EmptyMessage />;
    }

    return (
        <Stack spacing={4} height="100%" justifyContent="space-between">
            <FormControl>
                <Controller
                    name="students"
                    control={control}
                    render={({ field }) => (
                        <Stack spacing={1}>
                            {data.students.map((item) => {
                                const handleChange = getCheckboxChangeHandler(field)(item.id);
                                const description = [item.academicGroup?.name, item.commission?.name].filter(Boolean);

                                return (
                                    <BaseCheckbox
                                        key={item.id}
                                        label={item.fullName}
                                        value={item.id}
                                        description={description}
                                        checked={field.value?.includes(item.id)}
                                        onChange={handleChange}
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
