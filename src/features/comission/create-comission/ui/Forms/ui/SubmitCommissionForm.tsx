import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSnackbar } from '@/shared/lib/hooks/useSnackbar';
import { BaseAlert, BaseChip, BaseLoadingButton } from '@/shared/ui';
import SaveIcon from '@mui/icons-material/Save';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateCommissionMutation } from '../../../api';
import { transformFormDataToRequest } from '../../../lib';
import { commissionFormActions, getCommissionForm } from '../../../model';

export const SubmitCommissionForm = memo(() => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { showSnackbar, Snackbar } = useSnackbar();
    const { forms } = useSelector(getCommissionForm);

    const { info, experts, groups, students } = forms;
    const isStepsValid = Object.values(forms).every((form) => form.isValid);

    const [createCommission, { isLoading, error, isSuccess }] = useCreateCommissionMutation();

    const handleClick = () => {
        dispatch(commissionFormActions.markStepsAsTouched());

        console.log(transformFormDataToRequest(forms));

        showSnackbar('success', `${info.data?.name} успешно создана`);

        if (isStepsValid) {
            // createCommission()
            //     .unwrap()
            //     .then(() => navigate(RoutePath.Commissions))
            //     .then(() => dispatch(commissionFormActions.resetForm()));
        }
    };

    return (
        <Paper component={Stack} spacing={4} sx={(theme) => ({ p: theme.spacing(3), borderRadius: theme.spacing(2) })}>
            {error && 'message' in error && <BaseAlert severity="error">{error.message}</BaseAlert>}
            {!error && (
                <>
                    {!isStepsValid && <BaseAlert severity="warning">Вы заполнили не все этапы</BaseAlert>}
                    {isStepsValid && <BaseAlert severity="success">Отлично, теперь можно создать комиссию!</BaseAlert>}
                </>
            )}
            <Stack spacing={2} divider={<Divider />}>
                <Stack spacing={0.5}>
                    <Typography fontSize={12}>Название комиссии</Typography>
                    <Typography>{info.data?.name}</Typography>
                </Stack>
                <Stack spacing={0.5}>
                    <Typography fontSize={12}>Ответственный секретарь</Typography>
                    <Typography>{info.data?.secretary.name}</Typography>
                </Stack>

                <Stack spacing={0.5}>
                    <Typography fontSize={12}>Председатель комиссии</Typography>
                    <Typography>{info.data?.chairperson.name}</Typography>
                </Stack>
                <Stack spacing={2}>
                    <Typography fontSize={12}>Академические группы</Typography>
                    <Stack direction="row" gap={1} flexWrap="wrap">
                        {groups.data?.academicGroups.map((group) => (
                            <BaseChip key={group.name} color="info" label={group.name} />
                        ))}
                    </Stack>
                </Stack>
                <Stack spacing={2}>
                    <Typography fontSize={12}>Количество экспертов по этапам</Typography>
                    <Stack direction="row" gap={1} flexWrap="wrap">
                        {experts.data
                            ? Object.entries(experts.data).map(([key, value]) => {
                                  const color = value.length > 0 ? 'success' : 'warning';
                                  const label = `${key}: ${value.length}`;

                                  return <BaseChip key={`experts-${label}`} color={color} label={label} />;
                              })
                            : 'Нет данных'}
                    </Stack>
                </Stack>
                <Stack spacing={2}>
                    <Typography fontSize={12}>Количество студентов по этапам</Typography>
                    <Stack direction="row" gap={1} flexWrap="wrap">
                        {students.data
                            ? Object.entries(students.data).map(([key, value]) => {
                                  const color = value.length > 0 ? 'success' : 'warning';
                                  const label = `${key}: ${value.length}`;

                                  return <BaseChip key={`students-${label}`} color={color} label={label} />;
                              })
                            : 'Нет данных'}
                    </Stack>
                </Stack>
            </Stack>
            <BaseLoadingButton
                variant="contained"
                onClick={handleClick}
                startIcon={<SaveIcon />}
                sx={{ alignSelf: 'flex-start' }}
                disabled={!isStepsValid}
                loading={isLoading}
            >
                Создать комисиию
            </BaseLoadingButton>
            {Snackbar}
        </Paper>
    );
});
