import { useGetExpertsQuery } from '@/entities/Expert';
import { BasePagination, EmptyMessage } from '@/shared/ui';
import { BaseCheckboxSkeletonList } from '@/shared/ui/Checkbox/Checkbox.skeleton';
import { FormControl, Stack } from '@mui/material';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ExpertsFormSchema } from '../../../../../model';
import { getExpertChangeHandler } from '../lib';
import { ExpertCheckbox } from './ExpertCheckbox';

type CommissionExpertsListProps = {
    name: string;
    control: Control<ExpertsFormSchema>;
    query: string;
};

const size = 10;
const defaultPage = 0;

export const CommissionExpertsList = memo((props: CommissionExpertsListProps) => {
    const { control, name, query } = props;
    const [page, setPage] = useState(defaultPage);

    const { data, isFetching } = useGetExpertsQuery({ query, size, page });

    const handleChangePage = useCallback((_: ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    }, []);

    useEffect(() => {
        setPage(defaultPage);
    }, [query]);

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
                                const handleChange = getExpertChangeHandler(field)(item.id);
                                const handleSwitchChange = getExpertChangeHandler(field)(item.id, 'isInvited');
                                const checked = field.value?.some((expert) => expert.id === item.id);
                                const invited = field.value?.some(
                                    (expert) => expert.id === item.id && expert.isInvited,
                                );

                                return (
                                    <ExpertCheckbox
                                        key={item.id}
                                        label={item.name}
                                        value={item.id}
                                        checked={checked}
                                        invited={invited}
                                        onChange={handleChange}
                                        onSwitchChange={handleSwitchChange}
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
