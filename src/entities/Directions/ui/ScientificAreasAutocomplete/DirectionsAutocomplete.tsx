import { Stack, Typography } from '@mui/material';
import { forwardRef, memo, Ref } from 'react';
import { BaseAutocomplete, BaseAutocompleteProps } from '@/shared/ui/Autocomplete/Autocomplete';

type ScientificAreasAutocompleteProps = Omit<BaseAutocompleteProps, 'ref'>;

export const DirectionsAutocomplete = memo(
    forwardRef((props: ScientificAreasAutocompleteProps, ref: Ref<any>) => {
        const { label, options, ...otherProps } = props;

        return (
            <Stack spacing={1}>
                {label && (
                    <Typography variant="bodyXS" color="#00000099">
                        {label}
                    </Typography>
                )}
                <BaseAutocomplete ref={ref} options={options || []} {...otherProps} />
            </Stack>
        );
    }),
);
