import { Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';

interface InfoCardProps {
    title: string;

    emptyText?: string;
    text?: string | number;
    formatted?: boolean;
}

export const InfoCard = memo((props: InfoCardProps) => {
    const { title, text, formatted, emptyText = 'Информация отсутсвует' } = props;

    return (
        <Paper
            sx={(theme) => ({
                padding: theme.spacing(3),
                borderRadius: theme.spacing(2),
            })}
        >
            <Stack spacing={2}>
                <Typography variant="h3">{title}</Typography>
                <Typography variant="subtitle2" fontWeight={500} whiteSpace={formatted ? 'pre' : 'normal'}>
                    {text || emptyText}
                </Typography>
            </Stack>
        </Paper>
    );
});
