import { RoutePath } from '@/app/providers/Router';
import { BaseButton } from '@/shared/ui';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';

export const CreateCommissionButton = () => {
    const navigate = useNavigate();

    const handleClick = (e: any) => {
        e.preventDefault();
        navigate(RoutePath.CreateComission);
    };

    return (
        <BaseButton
            variant="contained"
            component={Link}
            startIcon={<AddIcon />}
            onClick={handleClick}
            sx={{ alignSelf: 'flex-start' }}
        >
            Создать комисиию
        </BaseButton>
    );
};
