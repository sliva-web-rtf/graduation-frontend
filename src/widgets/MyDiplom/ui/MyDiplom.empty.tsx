import { CreateTopicButton } from '@/features/topic/create-topic';
import { EmptyMessage } from '@/shared/ui';
import { Stack } from '@mui/material';

export const MyDiplomEmpty = () => {
    return (
        <Stack height="70%" alignItems="center">
            <EmptyMessage message="Создайте свою первую тему, нажав на кнопку ниже" />
            <CreateTopicButton />
        </Stack>
    );
};
