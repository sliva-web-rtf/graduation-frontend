import { IconButton } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { userActions } from '@/entities/User';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const LogoutButton = memo(() => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        dispatch(userActions.logout());
        navigate(RoutePath.Login, { replace: true });
        window.location.reload();
    }, [dispatch, navigate]);

    return (
        <IconButton onClick={handleLogout}>
            <LogoutRoundedIcon />
        </IconButton>
    );
});
