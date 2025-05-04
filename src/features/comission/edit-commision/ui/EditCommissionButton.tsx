import DrawIcon from '@mui/icons-material/Draw';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEditCommisionPagePath } from '../lib/getEditCommisionPagePath';

type EditCommissionButtonProps = {
    commissionId: string;
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
