export interface User {
    id: number,
    fullName?: string,
    email?: string,
    lastLogin?: Date,
}

export interface UserSchema {
    authData?: User;

    _isInited: boolean;
}
