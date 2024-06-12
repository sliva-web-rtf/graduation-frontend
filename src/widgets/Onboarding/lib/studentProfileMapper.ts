import { StudentProfileDto } from '../api/types';
import { StudentProfile } from '../model/types/student-profile';

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
            scienceArea: dto.scientificAreaSubsections,
            scienceInterests: dto.scientificInterests,
            about: dto.about,
        },
    };
}
