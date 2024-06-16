import { ValidationErrorDto } from '@/shared/lib/types/dto/validationErrorDto';
import { extractErrorMessage } from '@/shared/lib/helpers/extractErrorMessage';
import { EntityValidationErrors } from '@/shared/lib/types/appError';
import { ProfessorPersonalInfoFormSchemaDto } from '../api/types';
import { ProfessorPersonalInfoFormSchema } from '../model/types/professorInfoFormSchema';

export function updateProfessorProfileToDto(
    model: ProfessorPersonalInfoFormSchema,
): ProfessorPersonalInfoFormSchemaDto {
    return {
        firstName: model.firstName,
        lastName: model.lastName,
        patronymic: model.middleName,
        email: model.email,
        phone: model.phone,
    };
}

export function validationUpdateProfileErrorsFromDto(
    errorDto?: ValidationErrorDto<ProfessorPersonalInfoFormSchemaDto>[] | null,
): EntityValidationErrors<ProfessorPersonalInfoFormSchema> {
    return {
        email: extractErrorMessage('email', errorDto),
        firstName: extractErrorMessage('firstName', errorDto),
        lastName: extractErrorMessage('lastName', errorDto),
        middleName: extractErrorMessage('patronymic', errorDto),
        phone: extractErrorMessage('phone', errorDto),
    };
}
