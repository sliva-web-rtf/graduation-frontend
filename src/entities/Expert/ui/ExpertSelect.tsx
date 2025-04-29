import { DEBOUNCE_DELAY } from '@/shared/lib/const';
import { BaseAutocomplete, BaseAutocompleteProps } from '@/shared/ui/Autocomplete/Autocomplete';
import { forwardRef, SyntheticEvent, useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useGetExpertsOptionsQuery } from '../api';

type ExpertSelectProps = Omit<BaseAutocompleteProps, 'options'>;

export const ExpertSelect = forwardRef<HTMLInputElement, ExpertSelectProps>((props: ExpertSelectProps, ref) => {
    const { onChange } = props;
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [queryValue, setQueryValue] = useState('');
    const { data, isFetching } = useGetExpertsOptionsQuery({ query }, { skip: !open });

    const handleQueryChange = useDebouncedCallback((value: string) => {
        setQuery(value);
    }, DEBOUNCE_DELAY);

    const handleQueryValueChange = useCallback(
        (_: SyntheticEvent<Element, Event>, value: string) => {
            setQueryValue(value);
            handleQueryChange(value);
        },
        [handleQueryChange],
    );

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = useCallback(
        (_: SyntheticEvent<Element, Event>, value: string) => {
            // @ts-expect-error
            onChange?.(value);
        },
        [onChange],
    );

    return (
        <BaseAutocomplete
            {...props}
            ref={ref}
            loading={isFetching}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            options={data ?? []}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            freeSolo={false}
            // Query
            inputValue={queryValue}
            onInputChange={handleQueryValueChange}
            onChange={handleChange}
        />
    );
});
