import { PersonSummary } from '@/entities/Person';
import { TopicStatusRus } from '@/entities/Topic';
import { BaseChip, TopicCardRow } from '@/shared/ui';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { QualificationWorkMainInfo } from '../model/types';

type QualificationWorkCardProps = Pick<
    QualificationWorkMainInfo,
    'topicName' | 'companyName' | 'companySupervisor' | 'student' | 'supervisor' | 'isCommand' | 'status'
>;

export const QualificationWorkCard = memo((props: QualificationWorkCardProps) => {
    const { topicName, companyName, companySupervisor, student, supervisor, isCommand, status } = props;

    return (
        <Paper sx={(theme) => ({ padding: theme.spacing(3), borderRadius: theme.spacing(2) })}>
            <Stack spacing={3} divider={<Divider />}>
                <Stack spacing={1}>
                    <Stack spacing={1} direction="row" alignItems="center">
                        <BaseChip label={TopicStatusRus[status]} color="success" />
                        {isCommand && <BaseChip label="Командный проект" color="warning" />}
                    </Stack>
                    <Typography variant="h2">{topicName}</Typography>
                </Stack>
                <Stack spacing={1} divider={<Divider />}>
                    <Stack spacing={1}>
                        <TopicCardRow left="Предприятие" right={companyName} isText />
                        <TopicCardRow left="Куратор от предприятия" right={companySupervisor ?? 'Нет данных'} isText />
                    </Stack>
                    <TopicCardRow left="Студент" right={<PersonSummary {...student} isLink isStudent />} />
                    <TopicCardRow left="Руководитель" right={<PersonSummary {...supervisor} isLink />} />
                </Stack>
            </Stack>
        </Paper>
    );
});
