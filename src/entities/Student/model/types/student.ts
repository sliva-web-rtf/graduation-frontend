import { ScientificAreas } from 'features/catalog/Search/api/types';
import { StudentStatus } from './studentStatus';

export interface Student {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly patronymic: string;
    readonly phoneNumber: string;
    readonly email: string;
    readonly isFavorite: boolean;
    readonly degree: string;
    readonly commandSearching: boolean;
    readonly professorSearching: boolean;
    readonly scientificInterests: Array<string>;
    readonly scientificArea: ScientificAreas;
    readonly status: StudentStatus;
    readonly avatarImagePath?: string;
    readonly contacts?: string;
}
