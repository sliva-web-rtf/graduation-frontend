import { InfoCard } from '@/shared/ui';
import { Stack } from '@mui/material';

type TopicMainInfoProps = {
    description?: string;
    result?: string;
};

export const TopicMainInfo = (props: TopicMainInfoProps) => {
    const { description, result } = props;

    return (
        <Stack spacing={2} width="100%">
            <InfoCard title="Описание темы" text={description} />
            <InfoCard title="Ожидаемый эффект" text={result} />
        </Stack>
    );
};
