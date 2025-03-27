import { SearchingStatus } from '@/shared/lib/types/searchingStatus';

export interface Student {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly patronymic: string;
    readonly phoneNumber: string;
    readonly email: string;
    readonly degree: string;
    readonly commandSearching: boolean;
    readonly professorSearching: boolean;
    readonly status: SearchingStatus;
    readonly contacts?: string;
}
