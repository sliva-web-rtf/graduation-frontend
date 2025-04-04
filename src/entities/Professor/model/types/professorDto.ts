export interface ProfessorDto {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly patronymic: string;
    readonly degree: string;
    readonly post: string;
    readonly fullness: number;
    readonly limit: number;
    readonly canJoin: boolean;
    readonly email: string;
    readonly address: string;
    readonly contacts: string;
    readonly about: string;
}
