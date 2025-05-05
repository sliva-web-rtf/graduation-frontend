import { CommissionChangePayload } from '@/features/comission/create-commission/ui/Forms/ui/CommissionStudentsForm/lib';
import { BaseSelect, BaseSelectProps } from '@/shared/ui';
import { memo, useCallback, useState } from 'react';
import { useGetCommissionsQuery } from '../api';
import { transformCommissionsToOptions } from '../lib/transformCommissionsToOptions';

type ComissionSelectProps = Omit<BaseSelectProps, 'options'> &
    Pick<CommissionChangePayload, 'commissionName'> & { excludedValue?: string | null };

export const ComissionSelect = memo((props: ComissionSelectProps) => {
    const { excludedValue } = props;
    const defaultOptions = [{ label: props.commissionName, value: props.value }].filter((i) => i.label && i.value);
    const [open, setOpen] = useState(false);

    const insertExcludedValue = useCallback(
        (item: { value: string }) => (item.value === excludedValue ? { ...item, disabled: true } : item),
        [excludedValue],
    );

    const { data, isFetching } = useGetCommissionsQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => ({
            data: transformCommissionsToOptions(data)?.map(insertExcludedValue),
            isFetching,
        }),
        skip: !open,
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
            label="Комиссия"
            useController={false}
            options={data?.length ? data : defaultOptions}
            {...props}
        />
    );
});
