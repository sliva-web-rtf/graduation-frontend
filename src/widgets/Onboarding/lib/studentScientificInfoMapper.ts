import { ValidationErrorDto } from '@/shared/lib/types/dto/validationErrorDto';
import { extractErrorMessage } from '@/shared/lib/helpers/extractErrorMessage';
import { EntityValidationErrors } from '@/shared/lib/types/appError';
import { StudentScientificInfoDto } from '../api/types';
import { ScientificFormSchema } from '../model/types/scientificFormSchema';

export function updateStudentScientificPortfolioToDto(model: ScientificFormSchema): StudentScientificInfoDto {
    return {
        degree: model.educationLevel,
        year: model.course,
        scientificAreaSubsections: model.scienceArea,
        scientificInterests: model.scienceInterests,
        about: model.about ?? '',
    };
}

export function validationStudentScientificPortfolioErrorsFromDto(
    errorDto?: ValidationErrorDto<StudentScientificInfoDto>[] | null,
): EntityValidationErrors<ScientificFormSchema> {
    return {
        educationLevel: extractErrorMessage('degree', errorDto),
        course: extractErrorMessage('year', errorDto),
        scienceArea: extractErrorMessage('scientificAreaSubsections', errorDto),
        scienceInterests: extractErrorMessage('scientificInterests', errorDto),
        about: extractErrorMessage('about', errorDto),
    };
}
