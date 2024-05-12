import React, { memo } from 'react';
import { FavoritesCheckbox } from 'shared/ui';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getCatalogIsFavoritesFilter } from 'widgets/Catalog';
import { catalogActions } from 'widgets/Catalog/model/slice/catalogSlice';
import { Box } from '@mui/material';

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
