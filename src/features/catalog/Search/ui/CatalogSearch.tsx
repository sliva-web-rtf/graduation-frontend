import { Stack } from '@mui/material';
import { ChangeEvent, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { DirectionsAutocomplete } from '@/entities/Directions';
import { DEBOUNCE_DELAY } from '@/shared/lib/const';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseSearch } from '@/shared/ui';
import { catalogActions, getCatalog } from '@/widgets/Catalog';

export const Search = memo(() => {
    const dispatch = useAppDispatch();
    const { search, direction, directions } = useSelector(getCatalog);
    const [searchValue, setSearchValue] = useState(search);

    const handleSearchChange = useDebouncedCallback((value: string) => {
        dispatch(catalogActions.setSearch(value));
    }, DEBOUNCE_DELAY);

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        handleSearchChange(e.target.value);
    };

    const onChangeDirection = (_: unknown, value: string) => dispatch(catalogActions.setDirection(value));

    return (
        <Stack direction="row" spacing={2}>
            <BaseSearch value={searchValue} onChange={onChangeSearch} />
            <DirectionsAutocomplete
                value={direction}
                onChange={onChangeDirection}
                options={directions}
                placeholder="Направление подготовки"
            />
        </Stack>
    );
});
