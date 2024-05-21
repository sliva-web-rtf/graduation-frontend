import { CatalogOptions } from './catalogOptions';

export interface CatalogRequest {
    option: CatalogOptions;
    params: {
        page: number;
        pageSize: number;
        scientificAreaSubsections?: string[];
        scientificInterests?: string[];
        isFavoriteFilterOnly: boolean;
    };
}
