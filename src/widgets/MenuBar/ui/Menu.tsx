import { RoutePath } from '@/app/providers/Router';
import { LogoutMenuItem } from '@/features/logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import { MouseEvent, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppMenu = memo(() => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleProfileClick = useCallback(() => {
        navigate(RoutePath.Profile);
        handleClose();
    }, [navigate, handleClose]);

    return (
        <>
            <Tooltip title="Открыть меню" placement="right-end">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <AccountCircleIcon />
                </IconButton>
            </Tooltip>
            {anchorEl && (
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleProfileClick}>
                        <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Личный кабинет</ListItemText>
                    </MenuItem>
                    <LogoutMenuItem />
                </Menu>
            )}
        </>
    );
});
