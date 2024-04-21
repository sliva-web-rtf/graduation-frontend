import { CatalogOptions } from 'shared/lib/types/catalogOptions';

export interface CatalogSchema {
    option: CatalogOptions;
    options: CatalogOptions[];
    pageSize: number;
    scientificInterests: string[];
    scientificAreas: string[];
}
