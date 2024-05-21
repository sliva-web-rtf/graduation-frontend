import { ValidationErrorDto } from 'shared/lib/types/dto/validationErrorDto';
import { extractErrorMessage } from 'shared/lib/helpers/extractErrorMessage';
import { EntityValidationErrors } from 'shared/lib/types/appError';
import { PersonalInfoFormSchemaDto } from '../api/types';
import { PersonalInfoFormSchema } from '../model/types/personalInfoFormSchema';

export function updateProfileToDto(model: PersonalInfoFormSchema): PersonalInfoFormSchemaDto {
    return {
        firstName: model.firstName,
        lastName: model.lastName,
        patronymic: model.middleName,
        email: model.email,
        contacts: model.contacts,
        phone: model.phone,
    };
}

export function validationUpdateProfileErrorsFromDto(
    errorDto?: ValidationErrorDto<PersonalInfoFormSchemaDto>[] | null,
): EntityValidationErrors<PersonalInfoFormSchema> {
    return {
        email: extractErrorMessage('email', errorDto),
        firstName: extractErrorMessage('firstName', errorDto),
        lastName: extractErrorMessage('lastName', errorDto),
        middleName: extractErrorMessage('patronymic', errorDto),
        phone: extractErrorMessage('phone', errorDto),
        contacts: extractErrorMessage('contacts', errorDto),
    };
}
