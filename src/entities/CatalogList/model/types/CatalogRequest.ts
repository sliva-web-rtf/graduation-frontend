import { CatalogOption } from '@/widgets/Catalog';

export interface CatalogRequest {
    option: CatalogOption;
    params: {
        page: number;
        pageSize: number;
        scientificAreaSubsections?: string[];
        scientificInterests?: string[];
    };
}
