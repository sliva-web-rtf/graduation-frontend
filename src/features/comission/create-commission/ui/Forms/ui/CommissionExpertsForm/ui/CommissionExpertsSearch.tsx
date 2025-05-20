import { DEBOUNCE_DELAY } from '@/shared/lib/const';
import { BaseSearch } from '@/shared/ui';
import { ChangeEvent, memo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type CommissionExpertsSearchProps = {
    query: string;
    onQueryChange: (query: string) => void;
};

export const CommissionExpertsSearch = memo((props: CommissionExpertsSearchProps) => {
    const { query, onQueryChange } = props;
    const [queryValue, setQueryValue] = useState(query);

    const handleQueryChange = useDebouncedCallback((value: string) => {
        onQueryChange(value);
    }, DEBOUNCE_DELAY);

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQueryValue(e.target.value);
        handleQueryChange(e.target.value);
    };

    return (
        <BaseSearch
            label="Поиск по ФИО эксперта"
            placeholder="Например: Иванов Иван Иванович"
            value={queryValue}
            onChange={handleValueChange}
        />
    );
});
