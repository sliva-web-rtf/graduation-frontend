import { Professor } from '../model/types/professor';
import { ProfessorDto } from '../model/types/professorDto';

export const mapProfessorDtoToModel = (dto: ProfessorDto): Professor => ({
    id: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    patronymic: dto.patronymic,
    degree: dto.degree,
    post: dto.post,
    fullness: dto.fullness,
    limit: dto.limit,
    isFavorite: dto.isFavorite,
    canJoin: dto.canJoin,
    phoneNumber: dto.phoneNumber,
    email: dto.email,
    address: dto.address,
    contacts: dto.contacts,
    publicationsCount: dto.publicationsCount,
    workExperienceYears: dto.workExperienceYears,
    scientificInterests: dto.scientificInterests,
    scientificArea: dto.scientificArea,
    about: dto.about,
    avatar: dto.avatarImagePath,
});
