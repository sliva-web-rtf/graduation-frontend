/* eslint-disable @typescript-eslint/no-explicit-any */

export type ValidationErrorDto<T extends Record<string, any>> = {
    field: keyof T;
    detail: string;
};

export interface ApiErrorDto<TDto extends Record<string, any>> {
    readonly errors?: ValidationErrorDto<TDto>[];

    readonly title?: string;
}
