import { Role } from '../model/types/role';

export interface UserDto {
    id: string;
    roles: Role[];
    firstName: string;
    lastName: string;
    email: string;

    qualificationWorkId?: string;
    patronymic?: string;
}

export interface TokenDto {
    token: string;
}

export interface LoginDto {
    userName: string;
    password: string;
}
