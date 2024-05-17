import { STATUS } from 'shared/api/status';
import { AppError } from 'shared/lib/types/appError';
import { PersonalInfoFormSchema } from './personalInfoFormSchema';

export interface LoginSchema {
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    contacts: string;
    phone: string;
    status: STATUS;
    error?: AppError<PersonalInfoFormSchema>;
}
