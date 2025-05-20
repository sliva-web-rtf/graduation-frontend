import { RoutePath } from '@/app/providers/Router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseAlert, BaseButton, BaseLoadingButton } from '@/shared/ui';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateCommissionMutation } from '../api';
import { CommissionTransform } from '../lib';
import { commissionFormActions, CommissionFormSchema } from '../model';

type SubmitCommissionButtonProps = {
    data: CommissionFormSchema['forms'];

    disabled?: boolean;
};

export const CreateCommissionButton = () => {
    const navigate = useNavigate();

    const handleClick = (e: any) => {
        e.preventDefault();
        navigate(RoutePath.CreateComission);
    };

    return (
        <BaseButton
            variant="contained"
            component={Link}
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleClick}
            sx={{ alignSelf: 'flex-start' }}
        >
            Создать комисиию
        </BaseButton>
    );
};

export const SubmitCommissionButton = (props: SubmitCommissionButtonProps) => {
    const { data, disabled } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [createCommission, { isLoading, error }] = useCreateCommissionMutation();

    const handleClick = () => {
        const requestData = CommissionTransform.transformFormDataToRequest(data);

        createCommission(requestData)
            .unwrap()
            .then(() => navigate(RoutePath.Commissions))
            .then(() => dispatch(commissionFormActions.resetForm()));
    };

    return (
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
            <BaseLoadingButton
                variant="contained"
                onClick={handleClick}
                startIcon={<AddCircleOutlineIcon />}
                disabled={disabled}
                loading={isLoading}
            >
                Создать
            </BaseLoadingButton>
            {error && 'message' in error && (
                <BaseAlert severity="error" fullWidth={false}>
                    {error.message}
                </BaseAlert>
            )}
            {!error && disabled && (
                <BaseAlert severity="warning" fullWidth={false}>
                    Вы заполнили не все этапы
                </BaseAlert>
            )}
        </Stack>
    );
};
