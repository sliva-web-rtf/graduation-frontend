import { StudentStatus } from './studentStatus';
import { ScientificAreaDto } from '@/entities/ScientificAreas/api/types';

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
    readonly scientificArea: ScientificAreaDto[];
    readonly status: StudentStatus;
    readonly avatarImagePath?: string;
    readonly contacts?: string;
}
