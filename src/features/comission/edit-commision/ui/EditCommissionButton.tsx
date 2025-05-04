import { RoutePath } from '@/app/providers/Router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseAlert, BaseLoadingButton } from '@/shared/ui';
import DrawIcon from '@mui/icons-material/Draw';
import { ListItemIcon, ListItemText, MenuItem, Stack } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommissionTransform } from '../../create-commission/lib';
import { commissionFormActions, CommissionFormSchema } from '../../create-commission/model';
import { useEditCommissionMutation } from '../api';
import { getEditCommisionPagePath } from '../lib/getEditCommisionPagePath';

type EditCommissionButtonProps = {
    commissionId: string;
};

type SubmitEditCommissionButtonProps = {
    commissionId: string;
    data: CommissionFormSchema['forms'];

    disabled?: boolean;
};

export const EditCommissionButton = (props: EditCommissionButtonProps) => {
    const { commissionId } = props;
    const navigate = useNavigate();

    const handleEdit = useCallback(() => {
        navigate(getEditCommisionPagePath(commissionId));
    }, [commissionId, navigate]);

    return (
        <MenuItem onClick={handleEdit}>
            <ListItemIcon>
                <DrawIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Редактировать</ListItemText>
        </MenuItem>
    );
};

export const SubmitEditCommissionButton = (props: SubmitEditCommissionButtonProps) => {
    const { commissionId, data, disabled } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [editCommission, { isLoading, error }] = useEditCommissionMutation();

    const handleClick = () => {
        const requestData = CommissionTransform.transformFormDataToRequest(data, commissionId);

        editCommission(requestData)
            .unwrap()
            .then(() => navigate(RoutePath.Commissions))
            .then(() => dispatch(commissionFormActions.resetForm()));
    };

    return (
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
            <BaseLoadingButton
                variant="contained"
                onClick={handleClick}
                startIcon={<DrawIcon />}
                disabled={disabled}
                loading={isLoading}
            >
                Редактировать комиссию
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
