import { Stack } from '@mui/material';
import { memo } from 'react';
import { BaseChip } from '@/shared/ui';

interface ChipsGroupProps {
    readonly chips: Array<string>;
    readonly maxCount: number;
}

export const ChipsGroup = memo((props: ChipsGroupProps) => {
    const { chips, maxCount } = props;

    const visibleChips = chips.slice(0, maxCount);
    const hiddenCount = chips.length - visibleChips.length;

    return (
        <Stack direction="row" gap={0.5} flexWrap="wrap">
            {visibleChips.map((item) => (
                <BaseChip key={item} variant="outlined" label={item} />
            ))}
            {hiddenCount > 0 && (
                <BaseChip
                    variant="filled"
                    sx={{
                        color: 'secondary.main',
                        backgroundColor: 'transparent',
                        padding: 0,
                    }}
                    label={`Eще ${hiddenCount}...`}
                />
            )}
        </Stack>
    );
});
