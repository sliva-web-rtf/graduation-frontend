import { BaseButton } from 'shared/ui/Button/Button';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { useNavigate } from 'react-router-dom';
import { memo, ReactNode, useCallback } from 'react';
import { RoutePath } from 'app/providers/Router/config/routeConfig';

interface BackButtonProps {
    readonly to?: string;
    readonly children?: ReactNode;
}

export const BackButton = memo((props: BackButtonProps) => {
    const { to, children } = props;
    const navigate = useNavigate();

    const handleClick = useCallback(() => navigate(to || RoutePath.Catalog), [navigate, to]);

    return (
        <BaseButton
            variant="shadowed"
            sx={(theme) => ({ alignSelf: 'flex-start', padding: [theme.spacing(1.5), theme.spacing(3)].join(' ') })}
            startIcon={<KeyboardBackspaceRoundedIcon />}
            onClick={handleClick}
        >
            {children || 'Вернуться к каталогу'}
        </BaseButton>
    );
});
