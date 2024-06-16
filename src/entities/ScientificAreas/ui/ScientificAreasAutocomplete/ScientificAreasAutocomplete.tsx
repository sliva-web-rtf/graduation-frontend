import { memo } from 'react';
import { BaseAutocomplete, BaseAutocompleteProps } from '@/shared/ui/Autocomplete/Autocomplete';
import { getScientificAreas } from '../../api/scientificAreasApi';
import { ScientificArea } from '../../model/types';

type ScientificAreasAutocompleteProps = Omit<BaseAutocompleteProps, 'ref' | 'options'>;

export const ScientificAreasAutocomplete = memo((props: ScientificAreasAutocompleteProps) => {
    const { isFetching: isAreasFetching, data: areas } = getScientificAreas();

    return (
        <BaseAutocomplete
            {...props}
            loading={isAreasFetching}
            options={areas || []}
            groupBy={(option: ScientificArea) => option.section}
        />
    );
});
