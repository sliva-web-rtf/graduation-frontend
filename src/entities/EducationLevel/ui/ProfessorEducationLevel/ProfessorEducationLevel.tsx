import { memo } from 'react';
import { BaseAutocomplete, BaseAutocompleteProps } from '@/shared/ui/Autocomplete/Autocomplete';
import { getProfessorEducationLevels } from '../../api/scientificInterestsApi';

type ProfessorEducationLevelAutoCompleteProps = Omit<BaseAutocompleteProps, 'ref' | 'options'>;

export const ProfessorEducationLevelAutoComplete = memo((props: ProfessorEducationLevelAutoCompleteProps) => {
    const { isFetching, data } = getProfessorEducationLevels();

    return <BaseAutocomplete {...props} loading={isFetching} options={data || []} />;
});
