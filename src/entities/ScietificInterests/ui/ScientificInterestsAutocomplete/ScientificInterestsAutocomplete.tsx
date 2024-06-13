import { memo } from 'react';
import { BaseAutocomplete, BaseAutocompleteProps } from '@/shared/ui/Autocomplete/Autocomplete';
import { getScientificInterests } from '../../api/scientificInterestsApi';

type ScientificInterestsAutocompleteProps = Omit<BaseAutocompleteProps, 'ref' | 'options'>;

export const ScientificInterestsAutocomplete = memo((props: ScientificInterestsAutocompleteProps) => {
    const { isFetching, data } = getScientificInterests();

    return <BaseAutocomplete {...props} loading={isFetching} options={data || []} />;
});
