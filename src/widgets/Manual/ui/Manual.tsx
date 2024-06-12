import { memo, useMemo } from 'react';
import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ManualBlock } from '@/widgets/Manual/ui/ManualBlock';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ManualSearch } from '@/features/manual/search';
import { getManualSearch } from '../model/selectors/getManualSearch/getManualSearch';
import { manualReducer } from '../model/slice/manualSlice';
import { MANUAL } from '../model/const';

const initialReducers: ReducersList = {
    manual: manualReducer,
};

export const Manual = memo(() => {
    const search = useSelector(getManualSearch);

    const filteredManual = useMemo(
        () =>
            MANUAL.map((item) => ({
                ...item,
                content: item.content.filter((card) => card.title.toLowerCase().includes(search.toLowerCase())),
            })).filter((item) => item.content.length),
        [search],
    );

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack spacing={6}>
                <Stack direction="row" spacing={6} alignItems="center" justifyContent="space-between">
                    <Typography variant="h1">Справочник исследователя</Typography>
                    <ManualSearch />
                </Stack>
                <Stack spacing={6}>
                    {filteredManual.map((item) => (
                        <ManualBlock key={item.title} title={item.title} content={item.content} />
                    ))}
                    {!filteredManual.length && <Typography variant="h3">Ничего не найдено</Typography>}
                </Stack>
            </Stack>
        </DynamicModuleLoader>
    );
});
