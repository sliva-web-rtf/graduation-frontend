import { AppError } from 'shared/lib/types/appError';
import { STATUS } from 'shared/api/status';
import { Role } from './roles';

export interface User {
    id: number;
    roles: Role[];
    fullName?: string;
    email?: string;
    lastLogin?: Date;
}

export interface UserSchema {
    authData?: User;
    userError?: string;
    tokenError?: string;
    userStatus: STATUS;
    refreshTokenStatus: STATUS;
    isInited: boolean;
}
