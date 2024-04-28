import React, { memo, useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { BaseAutocomplete } from 'widgets/Autocomplete/Autocomplete';
import { useDebounce } from 'use-debounce';
import { DEBOUNCE_DELAY } from 'shared/lib/const/const';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { catalogActions } from 'widgets/Catalog/model/slice/catalogSlice';
import { useSelector } from 'react-redux';
import { getCatalogInterests } from 'widgets/Catalog';
import { useGetScientificAreasQuery, useGetScientificInterestsQuery } from '../api/searchApi';
import styles from './CatalogSearch.module.scss';

export const Search = memo(() => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const [searchText] = useDebounce(search, DEBOUNCE_DELAY);
    const scientificInterests = useSelector(getCatalogInterests);
    const [areasValue, setAreasValue] = useState([]);

    const { isFetching: isInterestsFetching, data: interests } = useGetScientificInterestsQuery(searchText);
    const { isFetching: isAreasFetching, data: areas } = useGetScientificAreasQuery();

    const handleInterestsChange = useCallback(
        (_: any, newValue: any) => {
            dispatch(catalogActions.setScientificInterests(newValue));
        },
        [dispatch],
    );

    const handleAreasChange = useCallback(
        (_: any, newValue: any[]) => {
            setAreasValue(newValue as never);
            const mapped = newValue.map((item) => item.label);
            dispatch(catalogActions.setScientificAreas(mapped));
        },
        [dispatch],
    );

    return (
        <Box className={styles.inputs}>
            <BaseAutocomplete
                value={scientificInterests}
                placeholder="Поиск по ключевым словам"
                limitTags={1}
                loading={isInterestsFetching}
                options={interests || []}
                onChange={handleInterestsChange}
                onInputChange={(_, value) => setSearch(value)}
            />
            <BaseAutocomplete
                value={areasValue}
                placeholder="Область науки и технологий"
                limitTags={1}
                loading={isAreasFetching}
                options={areas || []}
                groupBy={(option) => option.section}
                onChange={handleAreasChange}
            />
        </Box>
    );
});
