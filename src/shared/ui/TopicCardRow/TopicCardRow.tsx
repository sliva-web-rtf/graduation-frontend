import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
    left: string;

    right?: string | ReactNode;
    isText?: boolean;
};

const clampedText = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

export const TopicCardRow = (props: Props) => {
    const { left, right, isText = false } = props;

    return (
        <Stack spacing={2} direction="row" justifyContent="space-between">
            <Typography variant="subtitle1" color="secondary" sx={clampedText}>
                {left}
            </Typography>
            {isText ? (
                <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }}>
                    {right || 'Н/Д'}
                </Typography>
            ) : (
                right
            )}
        </Stack>
    );
};
