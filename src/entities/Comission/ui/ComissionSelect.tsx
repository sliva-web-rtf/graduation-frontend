import { CommissionChangePayload } from '@/features/comission/create-commission/ui/Forms/ui/CommissionStudentsForm/lib';
import { BaseSelect, BaseSelectProps } from '@/shared/ui';
import { memo, useState } from 'react';
import { useGetCommissionsQuery } from '../api';
import { transformCommissionsToOptions } from '../lib/transformCommissionsToOptions';

type ComissionSelectProps = Omit<BaseSelectProps, 'options'> & Pick<CommissionChangePayload, 'commissionName'>;

export const ComissionSelect = memo((props: ComissionSelectProps) => {
    const defaultOptions = [{ label: props.commissionName, value: props.value }].filter((i) => i.label && i.value);
    const [open, setOpen] = useState(false);

    const { data, isFetching } = useGetCommissionsQuery(undefined, {
        selectFromResult: ({ data, isFetching }) => ({
            data: transformCommissionsToOptions(data),
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
