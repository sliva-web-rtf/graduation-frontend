import { memo } from 'react';
import { Avatar, Divider, Paper, Stack, Typography } from '@mui/material';
import scientificWorkImage from '@/shared/assets/images/scientificWork.png';
import { ProfessorSummary } from '@/entities/Professor';
import { BaseChip } from '@/shared/ui';
import { WorkStatusRus } from '@/entities/ScientificWork';
import { ScientificWork } from '../model/types/scientificWork';

const Row = ({ left, right }: { left: string; right?: string }) => (
    <Stack spacing={1} direction="row" justifyContent="space-between">
        <Typography
            variant="subtitle1"
            color="secondary"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '90%' }}
        >
            {left}
        </Typography>
        <Typography variant="subtitle1">{right}</Typography>
    </Stack>
);

export const TopicCard = memo((props: ScientificWork) => {
    const { name, professor, workStatus } = props;

    return (
        <Paper
            sx={(theme) => ({
                padding: theme.spacing(3),
                borderRadius: theme.spacing(4),
            })}
        >
            <Stack spacing={3}>
                <Stack spacing={1}>
                    <BaseChip label={WorkStatusRus[workStatus]} sx={{ alignSelf: 'flex-start' }} />
                    <Typography variant="h3">{name}</Typography>
                </Stack>
                <Divider />
                <Stack spacing={1}>
                    <Row left="Направление" right="Направление" />
                    <Row left="Требуемая роль" right="Роль" />
                    <Row left="Автор" right="Миронова Е.М." />
                    <Divider />
                    <Row left="Студент" right="Миронова Е.М." />
                    <Divider />
                    <Row left="Руководитель" right="Миронова Е.М." />
                </Stack>
            </Stack>
        </Paper>
    );
});
