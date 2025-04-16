import { PersonSummary } from '@/entities/Person';
import { BaseChip } from '@/shared/ui';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { memo, ReactNode } from 'react';
import { Topic, TopicStatus, TopicStatusRus } from '../model/types';

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
            <Stack spacing={3} divider={<Divider />}>
                <Stack spacing={1}>
                    <BaseChip label={TopicStatusRus[TopicStatus.Approved]} color="success" />
                    <Typography variant="h2">{name}</Typography>
                </Stack>
                <Stack spacing={1} divider={<Divider />}>
                    <Stack spacing={1}>
                        <Row left="Предприятие" right="" isText />
                        <Row left="Направление" right="" isText />
                        <Row left="Требуемая роль" right={requestedRole} isText />
                        <Row left="Автор" right={<PersonSummary {...owner} />} />
                    </Stack>
                    <Row left="Студент" right={<PersonSummary {...student} isLink isStudent />} />
                    <Row left="Руководитель" right={<PersonSummary {...supervisor} isLink />} />
                </Stack>
            </Stack>
        </Paper>
    );
});
