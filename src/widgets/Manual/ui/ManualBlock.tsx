import { memo } from 'react';
import { Stack, Typography } from '@mui/material';
import { ManualCard, ManualCardModel } from '@/entities/ManualCard';

interface ManualBlockProps {
    readonly title: string;
    readonly content: Array<ManualCardModel>;
}

export const ManualBlock = memo((props: ManualBlockProps) => {
    const { title, content } = props;

    return (
        <Stack spacing={3}>
            <Typography variant="h2">{title}</Typography>
            <Stack direction="row" gap={3} flexWrap="wrap">
                {content.map((item) => (
                    <ManualCard key={item.id} id={item.id} title={item.title} url={item.url} icon={item.icon} />
                ))}
            </Stack>
        </Stack>
    );
});
