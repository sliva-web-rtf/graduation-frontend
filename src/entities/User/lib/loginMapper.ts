import { extractErrorMessage } from 'shared/lib/helpers/extractErrorMessage';
import { type EntityValidationErrors } from 'shared/lib/types/appError';
import { type ValidationErrorDto } from 'shared/lib/types/dto/validationErrorDto';
import { type Login } from '../model/types/login';
import { type LoginDto } from '../api/types';

export function loginToDto(model: Login): LoginDto {
    return {
        email: model.email,
        password: model.password,
    };
}

export function validationLoginErrorsFromDto(
    errorDto?: ValidationErrorDto<LoginDto> | null,
): EntityValidationErrors<Login> {
    return {
        email: extractErrorMessage(errorDto?.email),
        password: extractErrorMessage(errorDto?.password) ?? extractErrorMessage(errorDto?.non_field_errors),
    };
}
