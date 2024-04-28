export interface Professor {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly patronymic: string;
    readonly degree: string;
    readonly scientificInterests: Array<string>;
    readonly limit: number;
    readonly fullness: number;
}
