import { PersonSummary } from '@/entities/Person/ui/PersonSummary';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { ComissionInfoRowProps } from '../model/types';

export const ComissionInfoRow: FC<ComissionInfoRowProps> = (props) => {
    const { left, right } = props;

    return (
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2">{left}</Typography>
            <PersonSummary name={right} />
        </Stack>
    );
};
