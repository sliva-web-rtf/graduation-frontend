import { getPercentByDate } from '@/shared/lib/helpers/calculateProcentProgress';
import { LinearProgress, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

type StageProgressProps = {
    stage: string;
};

export const StageProgress = (props: StageProgressProps) => {
    const { stage } = props;

    const percent = getPercentByDate('2024-09-01', '2025-07-01');
    const end = dayjs('2025-07-01').locale('ru');

    return (
        <Stack spacing={2}>
            <Typography variant="h2">{stage}</Typography>
            <Stack spacing={1}>
                <LinearProgress variant="determinate" value={percent} />
                <Stack direction="row" spacing={1}>
                    <Typography color="secondary">Окончание этапа:</Typography>
                    <Typography fontWeight={600}>{end.format('DD MMMM YYYY')}</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};
