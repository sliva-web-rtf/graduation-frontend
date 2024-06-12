import { memo, useCallback, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useSelector } from 'react-redux';
import { BaseAutocomplete } from '@/shared/ui/Autocomplete/Autocomplete';
import { DEBOUNCE_DELAY } from '@/shared/lib/const/const';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { catalogActions } from '@/widgets/Catalog/model/slice/catalogSlice';
import { getCatalogInterests } from '@/widgets/Catalog';
import { useGetScientificInterestsQuery } from '../api/searchApi';
import { ScientificArea, ScientificAreasAutocomplete } from '@/entities/ScientificAreas';

export const Search = memo(() => {
    const dispatch = useAppDispatch();
    const [isInterestsOpen, setInterestsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchText] = useDebounce(search, DEBOUNCE_DELAY);
    const scientificInterests = useSelector(getCatalogInterests);

    const { isFetching: isInterestsFetching, data: interests } = useGetScientificInterestsQuery(searchText, {
        skip: !isInterestsOpen,
    });

    const handleInterestsChange = useCallback(
        (_: any, newValue: any) => {
            dispatch(catalogActions.setScientificInterests(newValue));
        },
        [dispatch],
    );

    const handleAreasChange = useCallback(
        (newValue: ScientificArea[]) => {
            console.log(newValue);
            const mapped = newValue.map((item) => item.label);
            dispatch(catalogActions.setScientificAreas(mapped));
        },
        [dispatch],
    );

    return (
        <Stack direction="row" spacing={2}>
            <Box width="60%">
                <BaseAutocomplete
                    value={scientificInterests}
                    placeholder="Поиск по ключевым словам"
                    limitTags={1}
                    loading={isInterestsFetching}
                    options={interests || []}
                    onChange={handleInterestsChange}
                    onInputChange={(_, value) => setSearch(value)}
                    onOpen={() => setInterestsOpen(true)}
                />
            </Box>
            <Box width="40%">
                <ScientificAreasAutocomplete
                    limitTags={1}
                    handleChange={handleAreasChange}
                    placeholder="Область науки и технологий"
                />
            </Box>
        </Stack>
    );
});
