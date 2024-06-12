import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Stack } from '@mui/material';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { catalogActions } from '@/widgets/Catalog/model/slice/catalogSlice';
import { ScientificAreasAutocomplete } from '@/entities/ScientificAreas';
import { ScientificInterestsAutocomplete } from '@/entities/ScietificInterests';
import { getCatalogAreas, getCatalogInterests } from '@/widgets/Catalog';

export const Search = memo(() => {
    const dispatch = useAppDispatch();
    // TODO: улучшить структуру
    const areas = useSelector(getCatalogAreas);
    const interests = useSelector(getCatalogInterests);

    return (
        <Stack direction="row" spacing={2}>
            <Box width="60%">
                <ScientificInterestsAutocomplete
                    multiple
                    value={interests}
                    onChange={(_, value) => dispatch(catalogActions.setScientificInterests(value))}
                    placeholder="Поиск по ключевым словам"
                    limitTags={1}
                />
            </Box>
            <Box width="40%">
                <ScientificAreasAutocomplete
                    multiple
                    limitTags={1}
                    value={areas}
                    onChange={(_, value) => dispatch(catalogActions.setScientificAreas(value))}
                    placeholder="Область науки и технологий"
                />
            </Box>
        </Stack>
    );
});
