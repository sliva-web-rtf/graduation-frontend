import { BaseChip } from '@/shared/ui';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { commissionFormActions, getCommissionForm } from '../../../../../model';
import { SubmitCommissionButton } from '../../../../CreateCommissionButton';
import { StageChipCount } from './StageChipCount';

export const SubmitCommissionForm = memo(() => {
    const dispatch = useAppDispatch();
    const { forms } = useSelector(getCommissionForm);

    const { info, experts, groups, students } = forms;
    const isStepsValid = Object.values(forms).every((form) => form.isValid);

    useEffect(() => {
        dispatch(commissionFormActions.validateSteps());
    }, [dispatch]);

    return (
        <Paper component={Stack} spacing={4} sx={(theme) => ({ p: theme.spacing(3), borderRadius: theme.spacing(2) })}>
            <Stack spacing={2} divider={<Divider />}>
                <Stack spacing={0.5}>
                    <Typography fontSize={12}>Название комиссии</Typography>
                    <Typography>{info.data?.name}</Typography>
                </Stack>
                <Stack spacing={0.5}>
                    <Typography fontSize={12}>Ответственный секретарь</Typography>
                    <Typography>{info.data?.secretary?.name}</Typography>
                </Stack>

                <Stack spacing={0.5}>
                    <Typography fontSize={12}>Председатель комиссии</Typography>
                    <Typography>{info.data?.chairperson?.name}</Typography>
                </Stack>
                <Stack spacing={2}>
                    <Typography fontSize={12}>Академические группы</Typography>
                    <Stack direction="row" gap={1} flexWrap="wrap">
                        {groups.data?.academicGroups.map((group) => (
                            <BaseChip key={group.name} color="info" label={group.name} />
                        ))}
                    </Stack>
                </Stack>
                <StageChipCount title="Количество экспертов по этапам" data={experts.data} keyPrefix="experts" />
                <StageChipCount title="Количество студентов по этапам" data={students.data} keyPrefix="students" />
            </Stack>
            <SubmitCommissionButton data={forms} disabled={!isStepsValid} />
        </Paper>
    );
});
