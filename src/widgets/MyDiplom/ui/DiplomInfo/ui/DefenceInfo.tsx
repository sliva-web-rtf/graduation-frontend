import { InfoCard } from '@/shared/ui';
import { Stack } from '@mui/material';

type DefenceInfoProps = {
    date?: string;
    time?: string;
    location?: string;
};

export const DefenceInfo = (props: DefenceInfoProps) => {
    const { date, time, location } = props;
    const dateTime = date && time && `${date} в ${time}, Екатеринбург (UTC+5)`;

    return (
        <Stack direction="row" spacing={3} width="100%">
            <InfoCard title="Дата и время защиты" text={dateTime} />
            <InfoCard title="Место проведения" text={location} />
        </Stack>
    );
};
