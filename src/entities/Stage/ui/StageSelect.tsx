import { BaseSelect, BaseSelectProps } from '@/shared/ui';
import { memo } from 'react';
import { useGetStagesOptionsQuery } from '../api';

type StageSelectProps = Omit<BaseSelectProps, 'options'> & {};

export const StageSelect = memo((props: StageSelectProps) => {
    const { data, isFetching } = useGetStagesOptionsQuery();

    return (
        <BaseSelect
            label="Этап"
            useController={false}
            clearable={false}
            disabled={isFetching}
            options={data ?? []}
            {...props}
        />
    );
});
