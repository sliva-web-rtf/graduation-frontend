import { RoutePath } from '@/app/providers/Router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseAlert, BaseLoadingButton } from '@/shared/ui';
import SaveIcon from '@mui/icons-material/Save';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateCommissionMutation } from '../../../api';
import { commissionFormActions, getCommissionForm } from '../../../model';

export const SubmitCommissionForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { forms } = useSelector(getCommissionForm);
    const { info, experts, groups, students } = forms;
    const isStepsValid = Object.values(forms).every((form) => form.isValid);
    const [createCommission, { isLoading, error }] = useCreateCommissionMutation();

    const handleClick = () => {
        dispatch(commissionFormActions.markStepsAsTouched());

        if (isStepsValid) {
            createCommission()
                .unwrap()
                .then(() => navigate(RoutePath.Commissions))
                .then(() => dispatch(commissionFormActions.resetForm()));
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
                <Stack>
                    <Typography variant="subtitle1" color="secondary">
                        Название комиссии
                    </Typography>
                    <Typography>{info.data?.name}</Typography>
                </Stack>
                <Stack>
                    <Typography variant="subtitle1" color="secondary">
                        Ответственный секретарь
                    </Typography>
                    <Typography>{info.data?.clerk}</Typography>
                </Stack>
                <Stack direction="row" spacing={3} justifyContent="space-between" width="100%">
                    <Stack>
                        <Typography variant="subtitle1" color="secondary">
                            Количество экспертов
                        </Typography>
                        <Typography>{experts.data?.experts.length}</Typography>
                    </Stack>
                    <Stack>
                        <Typography variant="subtitle1" color="secondary">
                            Количество групп
                        </Typography>
                        <Typography>{groups.data?.groups.length}</Typography>
                    </Stack>
                    <Stack>
                        <Typography variant="subtitle1" color="secondary">
                            Количество студентов
                        </Typography>
                        <Typography>{students.data?.students.length}</Typography>
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
        </Paper>
    );
};
