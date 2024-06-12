import { memo, useCallback, useState } from 'react';
import { BaseAutocomplete, BaseAutocompleteProps } from '@/shared/ui/Autocomplete/Autocomplete';
import { getScientificAreas } from '../../api/scientificAreasApi';
import { ScientificArea } from '../../model/types';

type ScientificAreasAutocompleteProps = Omit<BaseAutocompleteProps, 'ref' | 'options'> & {
    handleChange: (value: ScientificArea[]) => void;
};

export const ScientificAreasAutocomplete = memo((props: ScientificAreasAutocompleteProps) => {
    const { handleChange, ...autoCompleteProps } = props;
    const [isAreasOpen, setAreasOpen] = useState(false);
    const [areasValue, setAreasValue] = useState<ScientificArea[]>([]);

    const { isFetching: isAreasFetching, data: areas } = getScientificAreas(undefined, {
        skip: !isAreasOpen,
    });
    const handleAreasChange = useCallback(
        (_: unknown, targetValue: ScientificArea[]) => {
            setAreasValue(targetValue);
            handleChange(targetValue);
        },
        [handleChange],
    );

    return (
        <BaseAutocomplete
            {...autoCompleteProps}
            value={areasValue}
            loading={isAreasFetching}
            options={areas || []}
            groupBy={(option: ScientificArea) => option.section}
            onChange={handleAreasChange}
            onOpen={() => setAreasOpen(true)}
        />
    );
});
