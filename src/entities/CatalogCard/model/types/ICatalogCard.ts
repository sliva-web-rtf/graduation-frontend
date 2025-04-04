import { CatalogOption } from '@/widgets/Catalog';

export interface ICatalogCard {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    option: CatalogOption;

    limit?: number;
    fullness?: number;
}
