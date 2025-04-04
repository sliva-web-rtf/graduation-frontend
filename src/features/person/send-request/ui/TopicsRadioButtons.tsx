import { TopicCardModel } from '@/entities/Topic';
import { BaseRadio } from '@/shared/ui';
import { Stack, Typography } from '@mui/material';
import { memo } from 'react';

type TopicsRadioButtonsProps = {
    items?: TopicCardModel[];
};

export const TopicsRadioButtons = memo((props: TopicsRadioButtonsProps) => {
    const { items } = props;

    if (!items?.length) {
        return <Typography color="secondary">Темы отсутсвуют</Typography>;
    }

    return (
        <Stack>
            {items.map((item: TopicCardModel) => (
                <BaseRadio key={item.id} label={item.name} value={item.id} />
            ))}
        </Stack>
    );
});
