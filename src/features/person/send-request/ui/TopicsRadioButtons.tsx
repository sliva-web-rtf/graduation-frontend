import { ICatalogCard } from '@/entities/CatalogCard';
import { BaseRadio } from '@/shared/ui';
import { Skeleton, Stack, Typography } from '@mui/material';
import { memo } from 'react';

type TopicsRadioButtonsProps = {
    items?: Omit<ICatalogCard, 'option'>[];
};

export const TopicsRadioButtons = memo((props: TopicsRadioButtonsProps) => {
    const { items } = props;

    if (!items?.length) {
        return <Typography color="secondary">Темы отсутсвуют</Typography>;
    }

    return (
        <Stack>
            {items.map((item) => (
                <BaseRadio key={item.id} label={item.title} value={item.id} />
            ))}
        </Stack>
    );
});

export const TopicsRadioButtonsSkeleton = () => {
    return (
        <Stack>
            <Skeleton height={40} />
            <Skeleton width="90%" height={40} />
        </Stack>
    );
};
