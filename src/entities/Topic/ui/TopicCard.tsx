import { PersonSummary } from '@/entities/Person';
import { BaseChip, TopicCardRow } from '@/shared/ui';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { Topic, TopicStatus, TopicStatusRus } from '../model/types';

export const TopicCard = memo((props: Topic) => {
    const { name, owner, student, supervisor, academicPrograms, companyName, companySupervisor, isCommand } = props;

    return (
        <Paper sx={(theme) => ({ padding: theme.spacing(3), borderRadius: theme.spacing(2) })}>
            <Stack spacing={3} divider={<Divider />}>
                <Stack spacing={1}>
                    <Stack spacing={1} direction="row" alignItems="center">
                        <BaseChip label={TopicStatusRus[TopicStatus.Approved]} color="success" />
                        {isCommand && <BaseChip label="Командный проект" color="warning" />}
                    </Stack>
                    <Typography variant="h2">{name}</Typography>
                </Stack>
                <Stack spacing={1} divider={<Divider />}>
                    <Stack spacing={1}>
                        <TopicCardRow left="Направление" right={academicPrograms?.join(', ')} isText />
                        <TopicCardRow left="Предприятие" right={companyName} isText />
                        <TopicCardRow left="Куратор от предприятия" right={companySupervisor} isText />
                        <TopicCardRow left="Автор" right={<PersonSummary {...owner} />} />
                    </Stack>
                    <TopicCardRow left="Студент" right={<PersonSummary {...student} isLink isStudent />} />
                    <TopicCardRow left="Руководитель" right={<PersonSummary {...supervisor} isLink />} />
                </Stack>
            </Stack>
        </Paper>
    );
});
