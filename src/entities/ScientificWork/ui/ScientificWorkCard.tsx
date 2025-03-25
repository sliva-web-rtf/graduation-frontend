import { memo } from 'react';
import { Avatar, Divider, Paper, Stack, Typography } from '@mui/material';
import scientificWorkImage from '@/shared/assets/images/scientificWork.png';
import { ProfessorSummary } from '@/entities/Professor';
import { BaseChip } from '@/shared/ui';
import { WorkStatusRus } from '@/entities/ScientificWork';
import { ScientificWork } from '../model/types/scientificWork';

export const ScientificWorkCard = memo((props: ScientificWork) => {
    const { name, fullness, limit, professor, workStatus } = props;

    return (
        <Paper
            sx={(theme) => ({
                paddingBottom: theme.spacing(3),
                borderRadius: theme.spacing(4),
            })}
        >
            <Stack spacing={3}>
                <Avatar
                    src={scientificWorkImage}
                    alt=""
                    sx={(theme) => ({
                        width: '100%',
                        height: '164px',
                        borderRadius: theme.spacing(4),
                    })}
                />
                <Stack spacing={3} px={2}>
                    <Typography variant="h3" textAlign="center">
                        {name}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1">Статус</Typography>
                        <BaseChip
                            label={WorkStatusRus[workStatus]}
                            sx={{
                                alignSelf: 'flex-start',
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
                    <ProfessorSummary {...professor} />
                </Stack>
            </Stack>
        </Paper>
    );
});
