import { Stack, Typography } from '@mui/material';
import { forwardRef, memo, Ref } from 'react';
import { BaseAutocomplete, BaseAutocompleteProps } from '@/shared/ui/Autocomplete/Autocomplete';
import { getScientificInterests } from '../../api/scientificInterestsApi';

type ScientificInterestsAutocompleteProps = Omit<BaseAutocompleteProps, 'ref' | 'options'>;

export const ScientificInterestsAutocomplete = memo(
    forwardRef((props: ScientificInterestsAutocompleteProps, ref: Ref<any>) => {
        const { label, ...otherProps } = props;
        const { isFetching, data } = getScientificInterests();

        return (
            <Stack spacing={1}>
                {label && (
                    <Typography variant="bodyXS" color="#00000099">
                        {label}
                    </Typography>
                )}

                <BaseAutocomplete ref={ref} limitTags={1} loading={isFetching} options={data || []} {...otherProps} />
            </Stack>
        );
    }),
);
