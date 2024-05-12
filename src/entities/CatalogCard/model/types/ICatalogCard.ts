import { WorkStatus } from 'entities/ScientificWork';
import { CatalogOptions } from 'entities/CatalogList';

export interface ICatalogCard {
    readonly id: string;
    readonly title: string;
    readonly chips: string[];
    readonly option: CatalogOptions;
    readonly isFavorite: boolean;
    readonly canJoin: boolean;
    readonly image?: any;
    readonly subtitle?: string;
    readonly status?: string;
    readonly limit?: number;
    readonly fullness?: number;
    readonly workStatus?: WorkStatus;
}
