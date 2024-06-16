import { ValidationErrorDto } from '@/shared/lib/types/dto/validationErrorDto';
import { StudentStatusDto } from '../api/types';
import { StudentSearchingStatus } from '../model/types/studentStatus';
import { EntityValidationErrors } from '@/shared/lib/types/appError';
import { extractErrorMessage } from '@/shared/lib/helpers/extractErrorMessage';

export function updateStudentStatusToDto(model: StudentSearchingStatus): StudentStatusDto {
    return {
        commandSearching: model.isTeamSearching,
        professorSearching: model.isProfessorSearching,
        status: model.status,
    };
}

export function validationUpdateStudentStatusErrorsFromDto(
    errorDto?: ValidationErrorDto<StudentStatusDto>[] | null,
): EntityValidationErrors<StudentSearchingStatus> {
    return {
        isTeamSearching: extractErrorMessage('commandSearching', errorDto),
        isProfessorSearching: extractErrorMessage('professorSearching', errorDto),
        status: extractErrorMessage('status', errorDto),
    };
}
