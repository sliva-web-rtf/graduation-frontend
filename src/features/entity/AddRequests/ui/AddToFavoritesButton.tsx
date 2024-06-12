import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { BaseButton } from '@/shared/ui/Button/Button';
import { isUserProfessor } from '@/entities/User/model/selectors/getUserRoles/getUserRoles';
import { CatalogOptions } from '@/entities/CatalogList';
import { useAddToFavoritesMutation } from '@/features/entity/AddRequests/api/addRequestsApi';

interface AddToFavoritesButtonProps {
    readonly id: string;
    readonly option: CatalogOptions;
    readonly isFavorite: boolean;
}

export const AddToFavoritesButton = memo((props: AddToFavoritesButtonProps) => {
    const { id, option, isFavorite: flag } = props;
    const [isFavorite, setFavorite] = useState(flag);
    const isProfessor = useSelector(isUserProfessor);

    const [addToFavorites, { isLoading }] = useAddToFavoritesMutation();

    const handleClick = () => {
        addToFavorites({ id, option, isProfessor, isFavorite });
        setFavorite((prev) => !prev);
    };

    return (
        <BaseButton
            onClick={handleClick}
            variant="text"
            startIcon={isFavorite ? <StarRoundedIcon color="primary" /> : <StarOutlineRoundedIcon />}
            sx={(theme) => ({
                padding: [theme.spacing(2), theme.spacing(3)].join(''),
            })}
            disabled={isLoading}
        >
            {isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        </BaseButton>
    );
});
