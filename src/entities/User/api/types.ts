import { Role } from '../model/types/role';

export interface UserDto {
    id: string;
    roles: Role[];
    firstName?: string;
    lastName?: string;
    patronymic?: string;
    email?: string;
    lastLogin?: string;
    isRegistrationComplete: boolean;
    emailConfirmed: boolean;
}

export interface TokenDto {
    token: string;
    refreshToken: string;
}

export interface LoginDto {
    password: string;
    email: string;
}

export interface RefreshTokenDto {
    refreshToken: TokenDto['refreshToken'];
}
