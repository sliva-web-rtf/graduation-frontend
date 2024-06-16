import { CatalogOption } from './catalogOption';
import { ScientificArea } from '@/entities/ScientificAreas';

export interface CatalogSchema {
    option: CatalogOption;
    options: Array<CatalogOption>;
    page: number;
    pageSize: number;
    pagesCount: Record<CatalogOption, number>;
    scientificInterests: Array<string>;
    scientificAreas: Array<ScientificArea>;
    isFavoriteFilterOnly: boolean;
}
