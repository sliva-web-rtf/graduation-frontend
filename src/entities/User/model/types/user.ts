import { Role } from './role';

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Role[];

    patronymic?: string;
};

export type UserSchema = {
    user?: User;
    topicId?: string;
};
