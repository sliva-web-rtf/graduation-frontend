import { SearchingStatus } from '@/shared/lib/types/searchingStatus';

export type StudentSearchingStatus = {
    status: SearchingStatus;
    isTeamSearching: boolean;
    isProfessorSearching: boolean;
};
