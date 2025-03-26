import { Box, Stack, Typography } from '@mui/material';
import { memo } from 'react';

interface InfoCardProps {
    readonly title: string;
    readonly text?: string | number;
    readonly formatted?: boolean;
}

export const InfoCard = memo((props: InfoCardProps) => {
    const { title, text, formatted } = props;

    return (
        <Box
            sx={(theme) => ({
                padding: theme.spacing(3),
                borderRadius: theme.spacing(1),
                backgroundColor: 'white',
                border: '1px solid var(--border-color)',
            })}
        >
            <Stack spacing={2}>
                <Typography variant="h3">{title}</Typography>
                <Typography variant="subtitle1" fontFamily="Monrope" whiteSpace={formatted ? 'pre' : 'normal'}>
                    {text || 'Пусто'}
                </Typography>
            </Stack>
        </Box>
    );
});
