import { isExternalUrl } from '@/shared/lib/helpers/isExternalUrl';
import { truncateText } from '@/shared/lib/helpers/truncateText';
import { Paper, Stack, Tooltip, Typography } from '@mui/material';
import { memo } from 'react';

interface InfoCardProps {
    title: string;
    text?: string;
    formatted?: boolean;
    emptyText?: string;
}

const defaultEmptyText = 'Информация отсутствует';

const renderText = (text: string | undefined, emptyText = defaultEmptyText) => {
    if (!text) {
        return emptyText;
    }

    if (isExternalUrl(text)) {
        return (
            <Tooltip title={text}>
                <a href={text} target="_blank" rel="noopener noreferrer">
                    {truncateText(text, 35)}
                </a>
            </Tooltip>
        );
    }

    return text;
};

export const InfoCard = memo((props: InfoCardProps) => {
    const { title, text, formatted, emptyText } = props;

    return (
        <Paper
            sx={(theme) => ({
                padding: theme.spacing(3),
                borderRadius: theme.spacing(2),
                width: '100%',
            })}
        >
            <Stack spacing={2}>
                <Typography variant="h3">{title}</Typography>

                <Typography variant="subtitle2" fontWeight={500} whiteSpace={formatted ? 'pre' : 'nowrap'}>
                    {renderText(text, emptyText)}
                </Typography>
            </Stack>
        </Paper>
    );
});
