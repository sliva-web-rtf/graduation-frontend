export interface Professor {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly patronymic: string;
    readonly degree: string;
    readonly fullness: number;
    readonly limit: number;
    readonly phoneNumber: string;
    readonly email: string;
    readonly address: string;
    readonly contacts: string;
    readonly publicationsCount: number;
    readonly scientificInterests: Array<string>;
    readonly scientificArea: Array<string>;
    readonly hIndex?: number;
    readonly image?: string;
    readonly urpUri?: string;
    readonly scopusUri?: string;
    readonly riscUri?: string;
}
