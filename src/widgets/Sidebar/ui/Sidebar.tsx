import { memo, useCallback } from 'react';
import { Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Logo from '@/shared/ui/Logo/Logo';
import { BaseButton } from '@/shared/ui/Button/Button';
import { MenuBar } from '@/widgets/MenuBar';
import { NavigationMenu } from '@/widgets/NavigationMenu';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userActions } from '@/entities/User';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import styles from './Sidebar.module.scss';

export const Sidebar = memo(() => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogoutButtonClick = useCallback(async () => {
        dispatch(userActions.logout());
        navigate(RoutePath.Login, { replace: true });
        window.location.reload();
    }, [dispatch, navigate]);

    return (
        <Stack component={Paper} className={styles.wrapper} sx={{ py: 4, pl: 1 }} justifyContent="space-between">
            <Stack spacing={2}>
                <Logo />
                <MenuBar sx={{ pr: 1 }} />
                <NavigationMenu />
            </Stack>
            <BaseButton
                sx={{ ml: 1, alignSelf: 'flex-start' }}
                color="secondary"
                startIcon={<LogoutRoundedIcon />}
                onClick={handleLogoutButtonClick}
            >
                Выйти
            </BaseButton>
        </Stack>
    );
});
