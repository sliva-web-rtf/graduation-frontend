import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { ChangeStatusButton } from '@/widgets/PersonalData/ui/changeStatusButton';
import { getStudentSearchingStatus } from '../../api/personalDataApi';
import { SearchingStatus } from '@/shared/lib/types/searchingStatus';
import { StudentSearching } from '../../model/types/StudentSearching';
import { SearchingStatusText } from '../SearchingStatusText/SearchingStatusText';

export const StudentStatusSearching = () => {
    const { data } = getStudentSearchingStatus();
    const [searchingType, setSearchingType] = useState<SearchingStatus>(data?.status ?? SearchingStatus.DoNotSearch);
    const [studentSearching, setStudentSearching] = useState<StudentSearching>({
        commandSearching: data?.commandSearching ?? false,
        professorSearching: data?.professorSearching ?? false,
    });

    useEffect(() => {
        if (data) {
            setSearchingType(data.status);
            setStudentSearching({
                commandSearching: data.commandSearching,
                professorSearching: data.professorSearching,
            });
        }
    }, [data]);

    return (
        <Stack sx={{ backgroundColor: 'white', padding: 3, borderRadius: 4 }}>
            <h3 style={{ marginBottom: '8px' }}>Статус поиска</h3>
            <Stack mb={1}>
                <SearchingStatusText studentSearching={studentSearching} searchingType={searchingType} />
            </Stack>
            <ChangeStatusButton />
        </Stack>
    );
};
