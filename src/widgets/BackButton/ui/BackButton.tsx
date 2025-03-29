import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { memo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseButton } from '@/shared/ui/Button/Button';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';

interface BackButtonProps {
    readonly to?: string;
    readonly children?: ReactNode;
}

export const BackButton = memo((props: BackButtonProps) => {
    const { to, children } = props;
    const navigate = useNavigate();

    const handleClick = () => navigate(to || RoutePath.Catalog);

    return (
        <BaseButton
            sx={() => ({ alignSelf: 'flex-start' })}
            startIcon={<KeyboardBackspaceRoundedIcon />}
            onClick={handleClick}
        >
            {children || 'Вернуться назад'}
        </BaseButton>
    );
});
