import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { IconButton, Tooltip } from '@mui/material';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userActions } from '@/entities/User';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';

export const LogoutButton = memo(() => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        dispatch(userActions.logout());
        navigate(RoutePath.Login, { replace: true });
        window.location.reload();
    }, [dispatch, navigate]);

    return (
        <Tooltip title="Выйти из аккаунта">
            <IconButton onClick={handleLogout} sx={{ padding: 0 }}>
                <LogoutRoundedIcon />
            </IconButton>
        </Tooltip>
    );
});
