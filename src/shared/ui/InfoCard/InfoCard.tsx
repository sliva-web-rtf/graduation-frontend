import { Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';

interface InfoCardProps {
    readonly title: string;
    readonly text?: string | number;
    readonly formatted?: boolean;
}

export const InfoCard = memo((props: InfoCardProps) => {
    const { title, text, formatted } = props;

    return (
        <Paper
            sx={(theme) => ({
                padding: theme.spacing(3),
                borderRadius: theme.spacing(2),
            })}
        >
            <Stack spacing={2}>
                <Typography variant="h3">{title}</Typography>
                <Typography variant="subtitle1" fontFamily="Monrope" whiteSpace={formatted ? 'pre' : 'normal'}>
                    {text || 'Пусто'}
                </Typography>
            </Stack>
        </Paper>
    );
});
