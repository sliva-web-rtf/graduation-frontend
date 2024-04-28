import { BaseButton } from 'shared/ui/Button/Button';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { AddRequestProps } from '../model/types/addRequest';

export const AddToFavorites = (props: AddRequestProps) => {
    const handleClick = () => console.log('sended');

    return (
        <BaseButton variant="text" startIcon={<StarOutlineRoundedIcon />} {...props}>
            Добавить в избранное
        </BaseButton>
    );
};
