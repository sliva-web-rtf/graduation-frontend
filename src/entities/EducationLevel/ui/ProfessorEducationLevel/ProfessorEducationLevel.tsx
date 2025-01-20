import { Stack, Typography } from '@mui/material';
import { forwardRef, memo } from 'react';
import { BaseAutocomplete, BaseAutocompleteProps } from '@/shared/ui/Autocomplete/Autocomplete';
import { getProfessorEducationLevels } from '../../api/scientificInterestsApi';

type ProfessorEducationLevelAutoCompleteProps = Omit<BaseAutocompleteProps, 'ref' | 'options'>;

export const ProfessorEducationLevelAutoComplete = memo(
    forwardRef((props: ProfessorEducationLevelAutoCompleteProps, ref: React.Ref<any>) => {
        const { label, ...otherProps } = props;
        const { isFetching, data } = getProfessorEducationLevels();

        return (
            <Stack spacing={1}>
                {label && (
                    <Typography variant="bodyXS" color="#00000099">
                        {label}
                    </Typography>
                )}
                <BaseAutocomplete ref={ref} loading={isFetching} options={data || []} {...otherProps} />
            </Stack>
        );
    }),
);
