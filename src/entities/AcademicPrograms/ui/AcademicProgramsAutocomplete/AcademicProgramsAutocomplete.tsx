import { Stack } from '@mui/material';
import { forwardRef, memo, Ref } from 'react';
import { BaseAutocomplete, BaseAutocompleteProps } from '@/shared/ui/Autocomplete/Autocomplete';
import { useGetAcademicProgramsQuery } from '../../api';

type Props = Omit<BaseAutocompleteProps, 'ref' | 'options'>;

export const AcademicProgramsAutocomplete = memo(
    forwardRef((props: Props, ref: Ref<any>) => {
        const { label, ...otherProps } = props;
        const { isFetching, data } = useGetAcademicProgramsQuery();

        return (
            <Stack spacing={1} width="100%">
                {/* {label && <Typography variant="bodyXS">{label}</Typography>} */}
                <BaseAutocomplete
                    ref={ref}
                    label={label}
                    placeholder="Направление подготовки"
                    {...otherProps}
                    loading={isFetching}
                    options={data ?? []}
                />
            </Stack>
        );
    }),
);
