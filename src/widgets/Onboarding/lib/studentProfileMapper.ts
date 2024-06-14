import { StudentProfileDto } from '../api/types';
import { StudentProfile } from '../model/types/studentProfile';

export function studentProfileFromDto(dto: StudentProfileDto): StudentProfile {
    return {
        personalInfo: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            middleName: dto.patronymic,
            email: dto.email,
            contacts: dto.contacts,
            phone: dto.phoneNumber,
        },
        scientificPorfolio: {
            educationLevel: dto.degree,
            course: dto.year,
            // TODO: пофиксить это и попросить бек присылать везде одинаковые объекты
            scienceArea: [],
            scienceInterests: dto.scientificInterests,
            about: dto.about,
        },
        studentStatus: {
            isTeamSearching: dto.commandSearching,
            isProfessorSearching: dto.professorSearching,
            status: dto.status,
        },
    };
}
