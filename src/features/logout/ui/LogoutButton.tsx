import LogoutIcon from '@mui/icons-material/Logout';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { memo, useState } from 'react';
import { LogoutModal } from './LogoutModal';

export const LogoutMenuItem = memo(() => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <MenuItem onClick={handleOpen}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Выйти</ListItemText>
            </MenuItem>
            <LogoutModal open={open} onClose={handleClose} />
        </>
    );
});
