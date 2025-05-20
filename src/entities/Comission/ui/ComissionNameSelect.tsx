import { BaseChip, BaseSelect, BaseSelectProps } from '@/shared/ui';
import { Stack } from '@mui/material';
import { memo, useState } from 'react';
import { useGetCommissionNamesQuery } from '../api';

type ComissionSelectProps = Omit<BaseSelectProps, 'options'> & { limitTags?: number };

export const ComissionNameSelect = memo((props: ComissionSelectProps) => {
    const [open, setOpen] = useState(false);
    const limitTags = props.limitTags ?? 2;

    const { data, isFetching } = useGetCommissionNamesQuery(undefined, {
        skip: !open,
        selectFromResult: (result) => ({
            data: result.data?.map(({ label, value }) => ({ label, value })),
            isFetching: result.isFetching,
        }),
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <BaseSelect
            loading={isFetching}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            multiple
            label="Комиссия"
            useController={false}
            options={data || []}
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
