import { BaseSelect, BaseSelectProps } from '@/shared/ui';
import { memo } from 'react';
import { useGetStagesQuery } from '../api';

type StageSelectProps = Omit<BaseSelectProps, 'options'> & {};

export const StageSelect = memo((props: StageSelectProps) => {
    const { data, isFetching } = useGetStagesQuery();

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
