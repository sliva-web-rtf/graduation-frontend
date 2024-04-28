import { BaseButton } from 'shared/ui/Button/Button';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { AddRequestProps } from '../model/types/addRequest';

export const AddToFavorites = ({ isSent = false }: AddRequestProps) => {
    const handleClick = () => console.log('sended');

    return (
        <BaseButton variant="text" startIcon={<StarOutlineRoundedIcon />} disabled={isSent}>
            Добавить в избранное
        </BaseButton>
    );
};
