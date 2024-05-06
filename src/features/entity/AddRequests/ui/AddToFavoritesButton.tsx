import { BaseButton } from 'shared/ui/Button/Button';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { AddRequestProps } from '../model/types/addRequest';

export const AddToFavoritesButton = (props: AddRequestProps) => {
    const handleClick = () => console.log('sended');

    return (
        <BaseButton
            variant="text"
            startIcon={<StarOutlineRoundedIcon />}
            sx={(theme) => ({
                padding: [theme.spacing(2), theme.spacing(3)].join(''),
            })}
            {...props}
        >
            Добавить в избранное
        </BaseButton>
    );
};
