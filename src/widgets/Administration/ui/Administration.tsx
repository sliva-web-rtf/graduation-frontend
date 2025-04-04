import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { administrationReducer, getAdministrationData } from '../model';
import { AdministrationOption } from '../model/types';
import { AdministrationGlobal } from './AdministrationGlobal';
import { AdministrationImport } from './AdministrationImport';
import { ToggleAdministration } from './ToggleAdministration';

const initialReducers: ReducersList = {
    administration: administrationReducer,
};

export const Administration = () => {
    const { option } = useSelector(getAdministrationData);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack spacing={4}>
                <ToggleAdministration />
                {option === AdministrationOption.Global && <AdministrationGlobal />}
                {option === AdministrationOption.Import && <AdministrationImport />}
            </Stack>
        </DynamicModuleLoader>
    );
};
