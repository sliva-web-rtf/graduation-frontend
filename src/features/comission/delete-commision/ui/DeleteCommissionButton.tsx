import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import { MouseEvent, useCallback, useState } from 'react';
import { DeleteCommissionModal } from './DeleteCommissionModal';

type DeleteCommissionButtonProps = {
    commissionId: string;
    commissionName: string;
    handleCloseMenu: (event: MouseEvent<any>) => void;
};

export const DeleteCommissionButton = (props: DeleteCommissionButtonProps) => {
    const { commissionId, commissionName, handleCloseMenu } = props;
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback((event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setOpen(true);
    }, []);

    const handleClose = useCallback(
        (event: MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            handleCloseMenu(event);
            setOpen(false);
        },
        [handleCloseMenu],
    );

    return (
        <>
            <MenuItem onClick={handleOpen}>
                <ListItemIcon>
                    <DeleteIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText>
                    <Typography color="error">Удалить</Typography>
                </ListItemText>
            </MenuItem>
            <DeleteCommissionModal
                open={open}
                onClose={handleClose}
                commissionId={commissionId}
                commissionName={commissionName}
            />
        </>
    );
};
