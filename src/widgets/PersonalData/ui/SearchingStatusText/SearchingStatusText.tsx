/* eslint-disable react/prop-types */
import { Typography } from '@mui/material';
import { memo } from 'react';
import { SearchingStatus } from '@/shared/lib/types/searchingStatus';
import { StudentSearching } from '../../model/types/StudentSearching';

type SearchingStatusTextProps = {
    studentSearching?: StudentSearching;
    searchingType?: SearchingStatus;
    studentsCount?: number;
};
export const SearchingStatusText: React.FC<SearchingStatusTextProps> = memo(
    ({ studentSearching, searchingType, studentsCount }) => {
        switch (searchingType) {
            case SearchingStatus.Seaching:
                return (
                    <>
                        {studentSearching?.professorSearching && <Typography>Ищу научного руководителя</Typography>}
                        {studentSearching?.commandSearching && <Typography>Ищу команду для исследований</Typography>}
                        {studentsCount && <Typography>Лимит студентов: {studentsCount}</Typography>}
                    </>
                );
            case SearchingStatus.ConsideringIncomingOffers:
                return <Typography>Рассматриваю предложения</Typography>;
            default:
                return <Typography>Не ищу научную деятельность</Typography>;
        }
    },
);
