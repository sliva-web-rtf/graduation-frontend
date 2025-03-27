import { Box, Stack } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { DirectionsAutocomplete } from '@/entities/Directions';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseSearch } from '@/shared/ui';
import { getDirections } from '@/widgets/Catalog';
import { catalogActions } from '@/widgets/Catalog/model/slice/catalogSlice';

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
