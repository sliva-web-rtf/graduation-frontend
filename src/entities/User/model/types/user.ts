import { Role } from './roles';

export interface User {
    id: number,
    roles: Role[],
    fullName?: string,
    email?: string,
    lastLogin?: Date,
}

export interface UserSchema {
    authData?: User;

    _isInited: boolean;
}
