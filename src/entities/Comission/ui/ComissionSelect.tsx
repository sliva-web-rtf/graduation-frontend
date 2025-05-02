import { BaseSelect, BaseSelectProps, OptionType } from '@/shared/ui';
import { memo, useEffect, useState } from 'react';
import { useGetCommissionsQuery } from '../api';
import { transformCommissionsToOptions } from '../lib/transformCommissionsToOptions';

type ComissionSelectProps = Omit<BaseSelectProps, 'options'> & { limitTags?: number };

export const ComissionSelect = memo((props: ComissionSelectProps) => {
    const [open, setOpen] = useState(false);
    const [cachedOptions, setCachedOptions] = useState<OptionType[]>([]);

    const { data, isFetching } = useGetCommissionsQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => ({
            data: transformCommissionsToOptions(data),
            isFetching,
        }),
        skip: !open && Boolean(cachedOptions.length),
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (data?.length) {
            setCachedOptions(data);
        }
    }, [data]);

    return (
        <BaseSelect
            loading={isFetching}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            label="Комиссия"
            useController={false}
            options={cachedOptions}
            {...props}
        />
    );
});
