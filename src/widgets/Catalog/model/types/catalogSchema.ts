import { SortDirection } from '@/shared/lib/const';
import { CatalogOption } from './catalogOption';

export interface CatalogSchema {
    search: string;
    option: CatalogOption;
    options: CatalogOption[];
    direction: string;
    directions: string[];
    page: number;
    pageSize: number;
    pagesCount: Record<CatalogOption, number>;
    order: SortDirection;
}
