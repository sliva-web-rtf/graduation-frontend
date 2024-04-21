import React, { memo, useState } from 'react';
import { Box } from '@mui/material';
import { BaseAutocomplete } from 'widgets/Autocomplete/Autocomplete';
import { useDebounce } from 'use-debounce';
import styles from './CatalogSearch.module.scss';
import { useGetScientificAreasQuery, useGetScientificInterestsQuery } from '../api/searchApi';

export const Search = memo(() => {
    const [search, setSearch] = useState<string>('');
    const [searchText] = useDebounce(search, 500);

    const { isFetching: isInterestsFetching, data: interests } = useGetScientificInterestsQuery(searchText);
    const { isFetching: isAreasFetching, data: areas } = useGetScientificAreasQuery();

    return (
        <Box className={styles.inputs}>
            <BaseAutocomplete
                placeholder="Поиск по ключевым словам"
                limitTags={1}
                loading={isInterestsFetching}
                options={interests || []}
                renderInput={() => null}
                onInputChange={(_, value) => setSearch(value)}
            />
            <BaseAutocomplete
                placeholder="Область науки и технологий"
                limitTags={1}
                loading={isAreasFetching}
                options={areas || []}
                groupBy={(option) => option.section}
                renderInput={() => null}
            />
        </Box>
    );
});
