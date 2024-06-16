import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { getManualSearch, manualActions } from '@/widgets/Manual';
import { BaseField } from '@/shared/ui';

export const ManualSearch = () => {
    const dispatch = useDispatch();
    const search = useSelector(getManualSearch);
    const [searchDeb, setSearchDeb] = useState(search);
    const [debounceSearch] = useDebounce(searchDeb, 300);

    useEffect(() => {
        if (debounceSearch !== search) {
            dispatch(manualActions.setSearch(debounceSearch));
        }
    }, [dispatch, search, debounceSearch]);

    return (
        <BaseField
            autoComplete="off"
            variant="standard"
            placeholder="Поиск"
            sx={(theme) => ({
                width: '300px',
                '& .MuiInputBase-root': {
                    padding: [theme.spacing(1), theme.spacing(2)].join(' '),
                },
            })}
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            value={searchDeb}
            onChange={(e) => setSearchDeb(e.target.value)}
        />
    );
};
