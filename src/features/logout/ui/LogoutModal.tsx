import { RoutePath } from '@/app/providers/Router';
import { userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseAlert, BaseButton, BaseModal } from '@/shared/ui';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoutModalProps {
    open: boolean;
    onClose: () => void;
}

export const LogoutModal: FC<LogoutModalProps> = ({ open, onClose }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        dispatch(userActions.logout());
        navigate(RoutePath.Login, { replace: true });
        window.location.reload();
    }, [dispatch, navigate]);

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Вы действительно хотите выйти?"
            actionButton={
                <BaseButton variant="text" onClick={handleLogout}>
                    Выйти
                </BaseButton>
            }
            cancelButton={
                <BaseButton variant="contained" onClick={onClose}>
                    Остаться
                </BaseButton>
            }
        >
            <BaseAlert severity="info">Отменить это действие будет невозможно</BaseAlert>
        </BaseModal>
    );
};
