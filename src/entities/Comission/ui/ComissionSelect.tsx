import { BaseSelect, BaseSelectProps } from '@/shared/ui';
import { memo } from 'react';
import { useGetComissionsQuery } from '../api';

type ComissionSelectProps = Omit<BaseSelectProps, 'options'> & {};

export const ComissionSelect = memo((props: ComissionSelectProps) => {
    const { data, isFetching } = useGetComissionsQuery();

    return (
        <BaseSelect
            label="Комиссия"
            clearText="Все комиссии"
            useController={false}
            disabled={isFetching}
            options={data ?? []}
            {...props}
        />
    );
});
