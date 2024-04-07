import { EntityValidationErrors } from '../appError';
import { ValidationErrorDto } from '../dto/validationErrorDto';

export type ValidationErrorMapper<TDto extends Record<string, any>, TModel extends Record<string, any>> = (
    errorDto?: ValidationErrorDto<TDto> | null,
) => EntityValidationErrors<TModel>;
