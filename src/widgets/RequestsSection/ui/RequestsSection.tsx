import { Stack } from '@mui/material';
import { ToggleList } from '@/features/requestsSection/ToggleList';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { requestsSectionReducer } from '../model/slice/requestsSectionSlice';

const initialReducers: ReducersList = {
    requestsSection: requestsSectionReducer,
};

export const RequestsSection = () => (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
        <Stack>
            <ToggleList />
        </Stack>
    </DynamicModuleLoader>
);
