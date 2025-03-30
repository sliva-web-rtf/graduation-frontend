import { Stack } from '@mui/material';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { requestsSectionReducer } from '../model';
import { ToggleList } from './ToggleList';

const initialReducers: ReducersList = {
    requests: requestsSectionReducer,
};

export const Requests = () => (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
        <Stack>
            <ToggleList />
        </Stack>
    </DynamicModuleLoader>
);
