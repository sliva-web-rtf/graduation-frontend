import { RoutePath } from '@/app/providers/Router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseAlert, BaseLoadingButton } from '@/shared/ui';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { commissionFormActions, getCommissionForm } from '../../../model';

export const SubmitCommissionForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { forms } = useSelector(getCommissionForm);
    const isStepsValid = forms.info.isValid && forms.groups.isValid && forms.students.isValid && forms.experts.isValid;

    const handleClick = () => {
        dispatch(commissionFormActions.markStepsAsTouched());

        if (isStepsValid) {
            console.log(forms);
            dispatch(commissionFormActions.resetForm());
            navigate(RoutePath.Commissions);
        }
    };

    return (
        <Stack spacing={2}>
            {!isStepsValid && <BaseAlert severity="error">Вы заполнили не все этапы</BaseAlert>}
            {isStepsValid && <BaseAlert severity="success">Отлично, теперь можно создать комиссию!</BaseAlert>}

            <BaseLoadingButton
                variant="contained"
                onClick={handleClick}
                startIcon={<AddIcon />}
                sx={{ alignSelf: 'flex-start' }}
                disabled={!isStepsValid}
            >
                Создать комисиию
            </BaseLoadingButton>
        </Stack>
    );
};
