import { BaseChip } from '@/shared/ui';
import { Stack, Typography } from '@mui/material';
import { memo } from 'react';

type StageChipCountProps = {
    title: string;
    keyPrefix: string;

    data: Record<string, any[]> | null;
};

export const StageChipCount = memo((props: StageChipCountProps) => {
    const { title, data, keyPrefix } = props;

    return (
        <Stack spacing={2}>
            <Typography fontSize={12}>{title}</Typography>
            <Stack direction="row" gap={1} flexWrap="wrap">
                {data ? (
                    Object.entries(data).map(([key, value], index) => {
                        const color = value.length > 0 ? 'success' : 'warning';
                        const label = `${key}: ${value.length}`;

                        return <BaseChip key={`${keyPrefix}-${index}`} color={color} label={label} />;
                    })
                ) : (
                    <BaseChip color="warning" label="Нет данных" />
                )}
            </Stack>
        </Stack>
    );
});
