import { ValidationErrorDto } from '@/shared/lib/types/dto/validationErrorDto';
import { extractErrorMessage } from '@/shared/lib/helpers/extractErrorMessage';
import { EntityValidationErrors } from '@/shared/lib/types/appError';
import { ProfessorScientificInfoDto } from '../api/types';
import { ProfessorScientificFormSchema } from '../model/types/professorScientificFormSchema';

export function updateProfessorScientificPortfolioToDto(
    model: ProfessorScientificFormSchema,
): ProfessorScientificInfoDto {
    return {
        degree: model.educationLevel,
        workExperienceYears: model.workExperienceYears,
        scientificAreaSubsections: model.scienceArea.map((value) => value.label),
        scientificInterests: model.scienceInterests,
        about: model.about ?? '',
        urpUri: model.urfuResearchPortal,
        scopusUri: model.scopus,
        riscUri: model.rinc,
        // TODO: исрпваить hard code.
        post: '',
        address: '',
    };
}

export function validationProfessorScientificPortfolioErrorsFromDto(
    errorDto?: ValidationErrorDto<ProfessorScientificInfoDto>[] | null,
): EntityValidationErrors<ProfessorScientificFormSchema> {
    return {
        educationLevel: extractErrorMessage('degree', errorDto),
        scienceArea: extractErrorMessage('scientificAreaSubsections', errorDto),
        scienceInterests: extractErrorMessage('scientificInterests', errorDto),
        about: extractErrorMessage('about', errorDto),
        workExperienceYears: extractErrorMessage('workExperienceYears', errorDto),
        urfuResearchPortal: extractErrorMessage('urpUri', errorDto),
        scopus: extractErrorMessage('scopusUri', errorDto),
        rinc: extractErrorMessage('riscUri', errorDto),
    };
}
