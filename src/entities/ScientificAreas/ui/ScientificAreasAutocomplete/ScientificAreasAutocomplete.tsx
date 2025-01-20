import { Stack, Typography } from '@mui/material';
import { forwardRef, memo } from 'react';
import { BaseAutocomplete, BaseAutocompleteProps } from '@/shared/ui/Autocomplete/Autocomplete';
import { getScientificAreas } from '../../api/scientificAreasApi';
import { ScientificArea } from '../../model/types';

type ScientificAreasAutocompleteProps = Omit<BaseAutocompleteProps, 'ref' | 'options'>;

export const ScientificAreasAutocomplete = memo(
    forwardRef((props: ScientificAreasAutocompleteProps, ref: React.Ref<any>) => {
        const { label, ...otherProps } = props;

        const { isFetching: isAreasFetching, data: areas } = getScientificAreas();
        const isOptionEqualToValue = (option: ScientificArea, value: ScientificArea | string) =>
            option.label === (value as ScientificArea).label || option.label === value;

        return (
            <Stack spacing={1}>
                {label && (
                    <Typography variant="bodyXS" color="#00000099">
                        {label}
                    </Typography>
                )}
                <BaseAutocomplete
                    ref={ref}
                    loading={isAreasFetching}
                    options={areas || []}
                    groupBy={(option: ScientificArea) => option.section}
                    isOptionEqualToValue={isOptionEqualToValue}
                    {...otherProps}
                />
            </Stack>
        );
    }),
);
