import { ScientificAreaDto } from '@/entities/ScientificAreas/api/types';

export interface ProfessorDto {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly patronymic: string;
    readonly degree: string;
    readonly post: string;
    readonly fullness: number;
    readonly limit: number;
    readonly isFavorite: boolean;
    readonly canJoin: boolean;
    readonly phoneNumber: string;
    readonly email: string;
    readonly address: string;
    readonly contacts: string;
    readonly publicationsCount: number;
    readonly workExperienceYears: number;
    readonly scientificInterests: Array<string>;
    readonly scientificArea: ScientificAreaDto[];
    readonly about: string;
    readonly avatarImagePath?: string;
}
