import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Stack } from '@mui/material';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { catalogActions } from '@/widgets/Catalog/model/slice/catalogSlice';
import { getDirections, getCatalogInterests } from '@/widgets/Catalog';
import { DirectionsAutocomplete } from '@/entities/Directions';
import { BaseSearch } from '@/shared/ui';

export const Search = memo(() => {
    const dispatch = useAppDispatch();
    const directions = useSelector(getDirections);

    return (
        <Stack direction="row" spacing={2}>
            <Box width="60%">
                <BaseSearch autoComplete="off" />
            </Box>
            <Box width="40%">
                <DirectionsAutocomplete
                    options={directions}
                    onChange={(_, value) => dispatch(catalogActions.setDirections(value))}
                    placeholder="Направление подготовки"
                />
            </Box>
        </Stack>
    );
});
