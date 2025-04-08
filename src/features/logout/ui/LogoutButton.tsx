import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { IconButton, Tooltip } from '@mui/material';
import { memo, useState } from 'react';
import { LogoutModal } from './LogoutModal';

export const LogoutButton = memo(() => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);
    const onClose = () => setOpen(false);

    return (
        <>
            <Tooltip title="Выйти из аккаунта">
                <IconButton onClick={toggleOpen} sx={{ padding: 0 }}>
                    <LogoutRoundedIcon />
                </IconButton>
            </Tooltip>
            <LogoutModal open={open} onClose={onClose} />
        </>
    );
});
