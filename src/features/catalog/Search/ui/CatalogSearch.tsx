import { Stack } from '@mui/material';
import { ChangeEvent, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { AcademicProgramsAutocomplete } from '@/entities/AcademicPrograms';
import { DEBOUNCE_DELAY } from '@/shared/lib/const';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseSearch } from '@/shared/ui';
import { catalogActions, getCatalog } from '@/widgets/Catalog';

export const Search = memo(() => {
    const dispatch = useAppDispatch();
    const { query, academicProgram } = useSelector(getCatalog);
    const [searchValue, setSearchValue] = useState(query);

    const handleSearchChange = useDebouncedCallback((value: string) => {
        dispatch(catalogActions.setSearch(value));
    }, DEBOUNCE_DELAY);

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        handleSearchChange(e.target.value);
    };

    const onChangeAcademicProgram = (_: unknown, value: string) => dispatch(catalogActions.setAcademicProgram(value));

    return (
        <Stack direction="row" spacing={2}>
            <BaseSearch value={searchValue} onChange={onChangeSearch} />
            <AcademicProgramsAutocomplete value={academicProgram} onChange={onChangeAcademicProgram} />
        </Stack>
    );
});
