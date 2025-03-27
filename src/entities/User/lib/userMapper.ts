import { UserDto } from '../api/types';
import { User } from '../model/types/user';

export const mapUserDtoToModel = (dto: UserDto): User => ({
    id: dto.id,
    roles: dto.roles,
    firstName: dto.firstName,
    lastName: dto.lastName,
    patronymic: dto.patronymic,
    email: dto.email,
    isRegistrationComplete: dto.isRegistrationComplete,
    emailConfirmed: dto.emailConfirmed,
});
