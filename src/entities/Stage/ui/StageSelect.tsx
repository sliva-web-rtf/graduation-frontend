import { BaseSelect, BaseSelectProps } from '@/shared/ui';
import { memo, useState } from 'react';
import { useGetStagesOptionsQuery } from '../api';

type StageSelectProps = Omit<BaseSelectProps, 'options'> & {};

export const StageSelect = memo((props: StageSelectProps) => {
    const [open, setOpen] = useState(false);
    const { data, isFetching } = useGetStagesOptionsQuery(undefined, { skip: !open });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <BaseSelect
            loading={isFetching}
            label="Этап"
            useController={false}
            clearable={false}
            disabled={isFetching}
            options={data ?? []}
            {...props}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
        />
    );
});
