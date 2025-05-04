import { ApiErrorDto } from '@/shared/lib/types/dto/validationErrorDto';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
}

export type FetchQueryApiError<T extends Record<string, any>> = FetchBaseQueryError & {
    data: ApiErrorDto<T>;
};

export function isApiError<TDto extends Record<string, any>>(error: unknown): error is FetchQueryApiError<TDto> {
    return (
        isFetchBaseQueryError(error) && Boolean(error.data) && typeof error.data === 'object' && 'title' in error.data!
    );
}
