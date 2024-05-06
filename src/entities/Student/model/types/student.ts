import { StudentStatus } from './studentStatus';

export interface Student {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly patronymic: string;
    readonly phoneNumber: string;
    readonly email: string;
    readonly degree: string;
    readonly publicationsCount: number;
    readonly commandSearching: boolean;
    readonly professorSearching: boolean;
    readonly scientificInterests: Array<string>;
    readonly scientificArea: Array<string>;
    readonly status: StudentStatus;
    readonly hIndex?: number;
    readonly image?: string;
    readonly contacts?: string;
    readonly urpUri?: string;
    readonly scopusUri?: string;
    readonly riscUri?: string;
}
