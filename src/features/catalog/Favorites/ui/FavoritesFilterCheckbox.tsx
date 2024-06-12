import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { FavoritesCheckbox } from '@/shared/ui';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getCatalogIsFavoritesFilter } from '@/widgets/Catalog';
import { catalogActions } from '@/widgets/Catalog/model/slice/catalogSlice';

export const FavoritesFilterCheckbox = memo(() => {
    const dispatch = useAppDispatch();
    const isChecked = useSelector(getCatalogIsFavoritesFilter);

    const handleClick = () => {
        dispatch(catalogActions.setIsFavoriteFilter(!isChecked));
    };

    return (
        <Box onClick={handleClick}>
            <FavoritesCheckbox checked={isChecked} />
        </Box>
    );
});
