import { WorkStatus } from '@/entities/ScientificWork';
import { CatalogOption } from '@/widgets/Catalog';

export interface ICatalogCard {
    readonly id: string;
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly option: CatalogOption;

    readonly canJoin?: boolean;
    readonly commandSearching?: boolean;
    readonly professorSearching?: boolean;
    readonly limit?: number;
    readonly fullness?: number;
}
