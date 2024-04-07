import { Role } from '../model/types/roles';

export interface UserDto {
    id: number;
    roles: Role[];
    fullName?: string;
    email?: string;
    lastLogin?: string;
}

export interface TokenDto {
    token: string;
    refreshToken: string;
}
