import { Role } from '../model/types/roles';

export interface UserDto {
    id: number;
    roles: Role[];
    fullName?: string;
    email?: string;
    lastLogin?: string;
    isRegistrationComplete: boolean;
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
