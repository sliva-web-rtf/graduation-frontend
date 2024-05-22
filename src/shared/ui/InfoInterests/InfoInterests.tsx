import { Stack } from '@mui/material';
import { BaseChip } from 'shared/ui';
import { memo } from 'react';

interface InfoInterestsProps {
    readonly chips?: Array<string>;
}

export const InfoInterests = memo((props: InfoInterestsProps) => {
    const { chips } = props;

    return (
        <Stack direction="row" flexWrap="wrap" gap={1} width="100%" overflow="scroll">
            {chips?.map((chip) => <BaseChip key={chip} label={chip} variant="outlined" />)}
        </Stack>
    );
});
