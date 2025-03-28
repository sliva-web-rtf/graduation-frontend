import { UserDto } from '../api/types';
import { User } from '../model/types/user';

export const mapUserDtoToModel = (dto: UserDto): User => ({
    id: dto.id,
    roles: dto.roles,
    fullName: dto.fullName,
    email: dto.email,
    isRegistrationComplete: dto.isRegistrationComplete,
    emailConfirmed: dto.emailConfirmed,
});
