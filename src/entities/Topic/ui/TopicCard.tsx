import { PersonSummary } from '@/entities/Person';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { memo, ReactNode } from 'react';
import { Topic } from '../model/types';

const clampedText = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
const Row = ({ left, right, isText }: { left: string; right?: string | ReactNode; isText?: boolean }) => (
    <Stack spacing={2} direction="row" justifyContent="space-between">
        <Typography variant="subtitle1" color="secondary" sx={clampedText}>
            {left}
        </Typography>
        {isText ? (
            <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap' }}>
                {right || 'Не указано'}
            </Typography>
        ) : (
            right
        )}
    </Stack>
);

export const TopicCard = memo((props: Topic) => {
    const { name, owner, student, supervisor, requestedRole } = props;

    return (
        <Paper sx={(theme) => ({ padding: theme.spacing(3), borderRadius: theme.spacing(2) })}>
            <Stack spacing={3}>
                <Stack spacing={1}>
                    {/* <BaseChip label={TopicStatusRus[workStatus]} sx={{ alignSelf: 'flex-start' }} /> */}
                    <Typography variant="h3">{name}</Typography>
                </Stack>
                <Divider />
                <Stack spacing={1}>
                    <Row left="Предприятие" right="" isText />
                    <Row left="Направление" right="" isText />
                    <Row left="Требуемая роль" right={requestedRole} isText />
                    <Row left="Автор" right={<PersonSummary {...owner} />} />
                    <Divider />
                    <Row left="Студент" right={<PersonSummary {...student} isLink />} />
                    <Divider />
                    <Row left="Руководитель" right={<PersonSummary {...supervisor} isLink />} />
                </Stack>
            </Stack>
        </Paper>
    );
});
