import { useGetExpertsQuery } from '@/entities/Expert';
import { BaseCheckbox, BasePagination, EmptyMessage } from '@/shared/ui';
import { BaseCheckboxSkeletonList } from '@/shared/ui/Checkbox/Checkbox.skeleton';
import { FormControl, Stack } from '@mui/material';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { getCheckboxChangeHandler } from '../../../../../lib';
import { ExpertsFormSchema } from '../../../../../model';

type CommissionExpertsListProps = {
    name: string;
    control: Control<ExpertsFormSchema>;
    query: string;
};

const size = 10;

export const CommissionExpertsList = memo((props: CommissionExpertsListProps) => {
    const { control, name, query } = props;
    const [page, setPage] = useState(0);

    const { data, isFetching } = useGetExpertsQuery({ query, size, page });

    const handleChangePage = useCallback((_: ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    }, []);

    if (isFetching) {
        return <BaseCheckboxSkeletonList count={size} />;
    }

    if (!data?.experts?.length) {
        return <EmptyMessage />;
    }

    return (
        <Stack spacing={4} height="100%" justifyContent="space-between">
            <FormControl key={name}>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Stack spacing={1}>
                            {data.experts.map((item) => {
                                const handleChange = getCheckboxChangeHandler(field)(item.id);

                                return (
                                    <BaseCheckbox
                                        key={item.id}
                                        label={item.name}
                                        value={item.id}
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
