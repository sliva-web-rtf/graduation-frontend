import { Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';

interface InfoCardProps {
    readonly title: string;
    readonly text: string | number;
}

export const InfoCard = memo((props: InfoCardProps) => {
    const { title, text } = props;

    return (
        <Paper
            sx={(theme) => ({
                padding: theme.spacing(3),
                borderRadius: theme.spacing(3),
            })}
        >
            <Stack spacing={2}>
                <Typography variant="h3">{title}</Typography>
                <Typography variant="body1">{text}</Typography>
            </Stack>
        </Paper>
    );
});
