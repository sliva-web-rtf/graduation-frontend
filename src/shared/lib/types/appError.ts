/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type EntityValidationErrors<T extends Record<string, any>> = {
    [P in keyof T]?: PropValidationMessage<T[P]>;
};

// eslint-disable-next-line no-unused-vars
type PropValidationMessage<T> = string;

export class AppError<TEntity extends Record<string, any> = never> extends Error {
    public override readonly message: string;

    public readonly validationData?: EntityValidationErrors<TEntity>;

    public constructor(message: string, validationData?: EntityValidationErrors<TEntity>) {
        super(message);
        this.message = message;
        this.validationData = validationData;
    }
}

export type ErrorResponse = {
    title: string;
    status: number;
};
