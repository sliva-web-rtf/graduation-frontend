import { STATUS } from '@/shared/api/status';
import { Role } from './role';

export interface User {
    id: string;
    roles: Role[];
    firstName?: string;
    lastName?: string;
    patronymic?: string;
    email?: string;
    lastLogin?: Date;
    isRegistrationComplete: boolean;
    emailConfirmed: boolean;
}

export interface UserSchema {
    authData?: User;
    userError?: string;
    tokenError?: string;
    userStatus: STATUS;
    isInited: boolean;
}
