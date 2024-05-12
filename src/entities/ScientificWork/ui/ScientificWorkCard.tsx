import { memo } from 'react';
import { Avatar, Divider, Paper, Stack, Typography } from '@mui/material';
import scientificWorkImage from 'shared/assets/images/scientificWork.png';
import { ProfessorSummary } from 'entities/Professor/ui/ProfessorSummary';
import { getInitials } from 'shared/lib/helpers/getInitials';
import { BaseChip } from 'shared/ui';
import { WorkStatus, WorkStatusRus } from 'entities/ScientificWork';
import { ScientificWork } from '../model/types/scientificWork';

export const ScientificWorkCard = memo((props: ScientificWork) => {
    const { name, fullness, limit, professor, workStatus } = props;
    const professorName = getInitials(professor?.firstName, professor?.lastName, professor?.patronymic) ?? '';

    return (
        <Paper
            sx={(theme) => ({
                padding: [theme.spacing(3), theme.spacing(2)].join(' '),
                borderRadius: theme.spacing(4),
            })}
        >
            <Stack spacing={3}>
                <Stack spacing={3} alignItems="center">
                    <Avatar
                        src={scientificWorkImage}
                        alt=""
                        sx={(theme) => ({
                            width: '100%',
                            height: '164px',
                            borderRadius: theme.spacing(4),
                        })}
                    />
                    <Typography variant="h3" textAlign="center">
                        {name}
                    </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1">Статус</Typography>
                    <BaseChip
                        label={WorkStatusRus[workStatus]}
                        sx={{
                            alignSelf: 'flex-start',
                            backgroundColor: `${workStatus === WorkStatus.Confirmed ? 'success' : 'secondary'}.light`,
                        }}
                    />
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1">Лимиты студентов</Typography>
                    <Typography variant="h4">
                        {fullness}/{limit}
                    </Typography>
                </Stack>
                <Divider />
                <ProfessorSummary id={professor?.id} image={professor?.image} name={professorName} />
            </Stack>
        </Paper>
    );
});
