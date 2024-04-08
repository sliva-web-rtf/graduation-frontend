import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ApiErrorDto } from 'shared/lib/types/dto/validationErrorDto';

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
}

export type FetchQueryApiError<T extends Record<string, unknown>> = FetchBaseQueryError & {
    data: ApiErrorDto<T>;
};

export function isApiError<TDto extends Record<string, unknown>>(error: unknown): error is FetchQueryApiError<TDto> {
    return isFetchBaseQueryError(error) && typeof error.data === 'object';
}
