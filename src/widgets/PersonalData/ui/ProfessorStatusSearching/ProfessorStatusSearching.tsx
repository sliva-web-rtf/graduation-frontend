import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { SearchingStatus } from '@/shared/lib/types/searchingStatus';
import { getProfessorSearchingStatus } from '../../api/personalDataApi';
import { SearchingStatusText } from '../SearchingStatusText/SearchingStatusText';
import { ChangeStatusButton } from '@/widgets/PersonalData/ui/changeStatusButton';

export const ProfessorStatusSearching = () => {
    const { data } = getProfessorSearchingStatus();
    const [searchingType, setSearchingType] = useState<SearchingStatus>(data?.status ?? SearchingStatus.DoNotSearch);
    const [studentsCount, setStudentsCount] = useState<number>(data?.limit ?? 0);

    useEffect(() => {
        if (data) {
            setSearchingType(data.status);
            setStudentsCount(data.limit);
        }
    }, [data]);
    return (
        <Stack sx={{ backgroundColor: 'white', padding: 3, borderRadius: 4 }}>
            <h3 style={{ marginBottom: '8px' }}>Статус поиска</h3>
            <Stack mb={1}>
                <SearchingStatusText searchingType={searchingType} studentsCount={studentsCount} />
            </Stack>
            <ChangeStatusButton />
        </Stack>
    );
};
