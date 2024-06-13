import { STATUS } from '@/shared/api/status';
import { Role } from './role';

export interface User {
    id: string;
    roles: Role[];
    fullName?: string;
    email?: string;
    lastLogin?: Date;
    isRegistrationComplete: boolean;
}

export interface UserSchema {
    authData?: User;
    userError?: string;
    tokenError?: string;
    userStatus: STATUS;
    isInited: boolean;
}
