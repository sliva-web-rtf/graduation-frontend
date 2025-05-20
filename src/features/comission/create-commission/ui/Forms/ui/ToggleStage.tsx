import { ToggleButtons } from '@/shared/ui';
import React, { memo, useCallback } from 'react';

type ToggleStageProps = {
    value: string;
    options?: string[];
    onChange: (stage: string) => void;
};

export const ToggleStage = memo((props: ToggleStageProps) => {
    const { value, options, onChange } = props;

    const handleChange = useCallback(
        (_: React.MouseEvent<HTMLElement>, newAlignment: string) => {
            if (newAlignment) {
                onChange(newAlignment);
            }
        },
        [onChange],
    );

    return (
        <ToggleButtons
            size="small"
            exclusive
            value={value}
            options={options ?? []}
            onChange={handleChange}
            sx={{ alignSelf: 'flex-start' }}
        />
    );
});
