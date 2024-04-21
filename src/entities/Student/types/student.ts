export interface Student {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly patronymic: string;
    readonly degree: string;
    readonly scientificInterests: string[];
    readonly status: string;
    readonly commandSearching: boolean;
    readonly professorSearching: boolean;
}
