import { Login } from '@/entities/User';
import { STATUS } from '@/shared/api/status';
import { AppError } from '@/shared/lib/types/appError';

export interface LoginSchema {
    email: string;
    password: string;
    status: STATUS;
    error?: AppError<Login>;
}
