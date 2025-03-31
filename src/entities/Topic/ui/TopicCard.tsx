import { Divider, Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { Topic } from '../model/types';

const Row = ({ left, right }: { left: string; right?: string }) => (
    <Stack spacing={1} direction="row" justifyContent="space-between">
        <Typography
            variant="subtitle1"
            color="secondary"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '90%' }}
        >
            {left}
        </Typography>
        <Typography variant="subtitle1">{right || 'Не указано'}</Typography>
    </Stack>
);

export const TopicCard = memo((props: Topic) => {
    const { name, owner, student, supervisor, requestedRole } = props;

    return (
        <Paper sx={(theme) => ({ padding: theme.spacing(3), borderRadius: theme.spacing(2) })}>
            <Stack spacing={3}>
                <Stack spacing={1}>
                    {/* <BaseChip label={WorkStatusRus[workStatus]} sx={{ alignSelf: 'flex-start' }} /> */}
                    <Typography variant="h3">{name}</Typography>
                </Stack>
                <Divider />
                <Stack spacing={1}>
                    <Row left="Предприятие" right="" />
                    <Row left="Направление" right="" />
                    <Row left="Требуемая роль" right={requestedRole} />
                    <Row left="Автор" right={owner?.name} />
                    <Divider />
                    <Row left="Студент" right={student?.name} />
                    <Divider />
                    <Row left="Руководитель" right={supervisor?.name} />
                </Stack>
            </Stack>
        </Paper>
    );
});
