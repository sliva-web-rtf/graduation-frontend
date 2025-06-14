import { DEBOUNCE_DELAY } from '@/shared/lib/const';
import { BaseAutocomplete, BaseAutocompleteProps } from '@/shared/ui/Autocomplete/Autocomplete';
import { forwardRef, SyntheticEvent, useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useGetAcademicGroupsQuery } from '../api';
import { mapAcademicGroupsDtoToOptions } from '../lib';

type Props = Omit<BaseAutocompleteProps, 'options'>;

export const AcademicGroupSelect = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    const { onChange } = props;
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [queryValue, setQueryValue] = useState('');
    const { data, isFetching } = useGetAcademicGroupsQuery(
        { query, page: 0, size: 50 },
        {
            skip: !open,
            selectFromResult: ({ data, isFetching }) => ({ data: mapAcademicGroupsDtoToOptions(data), isFetching }),
        },
    );

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
            label="Академическая группа"
            placeholder="РИ-410940"
            {...props}
            ref={ref}
            loading={isFetching}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            options={data}
            freeSolo={false}
            // Query
            inputValue={queryValue}
            onInputChange={handleQueryValueChange}
            onChange={handleChange}
        />
    );
});
