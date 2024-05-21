/* eslint-disable @typescript-eslint/no-explicit-any */

import { type FetchQueryApiError } from 'shared/api';
import { AppError } from '../appError';
import { ValidationErrorMapper } from './validationMapper';

export const UNKNOW_ERROR = 'Неизвестная ошибка';

export type ErrorMapper<TDto extends Record<string, any>, TEntity extends Record<string, any>> = ValidationErrorMapper<
    TDto,
    TEntity
>;

export class AppErrorMapper {
    public static fromDto<TErrorDto extends Record<string, any>>(httpError: FetchQueryApiError<TErrorDto>): AppError {
        const { data } = httpError;
        return new AppError(data.title ?? UNKNOW_ERROR);
    }

    public static fromDtoWithValidationSupport<
        TErrorDto extends Record<string, any>,
        TEntity extends Record<string, any>,
    >(httpError: FetchQueryApiError<TErrorDto>, mapper: ErrorMapper<TErrorDto, TEntity>): AppError<TEntity> {
        if (httpError?.status !== 400) {
            return this.fromDto(httpError as FetchQueryApiError<Record<string, any>>);
        }

        if (typeof mapper !== 'function') {
            throw new Error('Provided mapper does not have implementation of validationErrorFromDto');
        }

        const { errors: error, title } = httpError.data;

        if (error == null) {
            return this.fromDto(httpError);
        }

        const validationData = mapper(error);

        return new AppError<TEntity>(title ?? '', validationData);
    }
}
