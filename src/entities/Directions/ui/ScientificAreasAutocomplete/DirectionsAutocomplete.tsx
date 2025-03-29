import { Stack, Typography } from '@mui/material';
import { forwardRef, memo, Ref } from 'react';
import { BaseAutocomplete, BaseAutocompleteProps } from '@/shared/ui/Autocomplete/Autocomplete';

type Props = Omit<BaseAutocompleteProps, 'ref'>;

export const DirectionsAutocomplete = memo(
    forwardRef((props: Props, ref: Ref<any>) => {
        const { label, options, ...otherProps } = props;

        return (
            <Stack spacing={1} width="100%">
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
