import { SearchingStatus } from '@/shared/lib/types/searchingStatus';

export type StudentSearchingStatus = {
    status: SearchingStatus;
    commandSearching: boolean;
    professorSearching: boolean;
};
