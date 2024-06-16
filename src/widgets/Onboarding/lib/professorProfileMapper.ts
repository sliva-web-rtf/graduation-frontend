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
        scientificPorfolio: {
            educationLevel: dto.degree,
            workExperienceYears: dto.workExperienceYears,
            // TODO: пофиксить это и попросить бек присылать везде одинаковые объекты
            scienceArea: [],
            scienceInterests: dto.scientificInterests,
            about: dto.about,
            scopus: dto.scopusUri,
            rinc: dto.riscUri,
            urfuResearchPortal: dto.urpUri,
        },
        professorStatus: {
            status: dto.searchStatus,
            studentsCount: dto.limit,
        },
    };
}
