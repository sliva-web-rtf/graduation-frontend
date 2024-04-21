export interface ICatalogCard {
    readonly id: string;
    readonly title: string;
    readonly chips: string[];
    readonly image?: any;
    readonly subtitle?: string;
    readonly status?: string;
    readonly limit?: number;
    readonly fullness?: number;
}
