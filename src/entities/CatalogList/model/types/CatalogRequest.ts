import { SortDirection } from '@/shared/lib/const';
import { CatalogOption } from '@/widgets/Catalog';

export interface CatalogRequest {
    option: CatalogOption;
    params: {
        search: string;
        page: number;
        pageSize: number;
        direction: string;
        order: SortDirection;
    };
}
