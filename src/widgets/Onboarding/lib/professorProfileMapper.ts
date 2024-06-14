import { ProfessorProfileDto } from '../api/types';
import { ProfessorProfile } from '../model/types/professorProfile';

export function professorProfileFromDto(dto: ProfessorProfileDto): ProfessorProfile {
    return {
        personalInfo: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            middleName: dto.patronymic,
            email: dto.email,
            phone: dto.phoneNumber,
        },
    };
}
