import { DEBOUNCE_DELAY } from '@/shared/lib/const';
import { BaseSearch } from '@/shared/ui';
import { Stack } from '@mui/material';
import { ChangeEventHandler, memo, useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type AdministrationLogsFilterProps = {
    query: string;
    setQuery: (value: string) => void;
};

export const AdministrationLogsFilter = memo((props: AdministrationLogsFilterProps) => {
    const { query, setQuery } = props;
    const [queryValue, setQueryValue] = useState(query);

    const handleQueryChange = useDebouncedCallback((value: string) => {
        setQuery(value);
    }, DEBOUNCE_DELAY);

    const handleQueryValueChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (e) => {
            setQueryValue(e.target.value);
            handleQueryChange(e.target.value);
        },
        [handleQueryChange],
    );

    return (
        <Stack spacing={4}>
            <BaseSearch placeholder="Поиск по логам" value={queryValue} onChange={handleQueryValueChange} />
        </Stack>
    );
});
