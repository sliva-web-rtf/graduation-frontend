import { BaseChip, BaseSelect, BaseSelectProps } from '@/shared/ui';
import { Stack } from '@mui/material';
import { memo } from 'react';
import { useGetCommissionNamesQuery } from '../api';

type ComissionSelectProps = Omit<BaseSelectProps, 'options'> & { limitTags?: number };

export const ComissionSelect = memo((props: ComissionSelectProps) => {
    const { data, isFetching } = useGetCommissionNamesQuery();
    const limitTags = props.limitTags ?? 2;

    return (
        <BaseSelect
            multiple
            label="Комиссия"
            useController={false}
            options={data || []}
            disabled={isFetching}
            renderValue={(selected: unknown) => (
                <Stack direction="row" gap={0.5}>
                    {(selected as string[]).slice(0, limitTags).map((value) => (
                        <BaseChip size="small" color="secondary" key={value} label={value} />
                    ))}
                    {limitTags && (selected as string[]).length > limitTags && (
                        <BaseChip
                            size="small"
                            color="secondary"
                            label={`+${(selected as string[]).length - limitTags}`}
                        />
                    )}
                </Stack>
            )}
            {...props}
        />
    );
});
