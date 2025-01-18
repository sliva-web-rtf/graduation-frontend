import { ValidationErrorDto } from '@/shared/lib/types/dto/validationErrorDto';
import { ProfessorStatusDto } from '../api/types';
import { EntityValidationErrors } from '@/shared/lib/types/appError';
import { extractErrorMessage } from '@/shared/lib/helpers/extractErrorMessage';
import { ProfessorSearchingStatus } from '../model/types/professorStatus';

export function updateProfessorStatusToDto(model: ProfessorSearchingStatus): ProfessorStatusDto {
    return {
        limit: model.studentsCount,
        status: model.status,
    };
}

export function validationUpdateProfessorStatusErrorsFromDto(
    errorDto?: ValidationErrorDto<ProfessorStatusDto>[] | null,
): EntityValidationErrors<ProfessorSearchingStatus> {
    return {
        studentsCount: extractErrorMessage('limit', errorDto),
        status: extractErrorMessage('status', errorDto),
    };
}
