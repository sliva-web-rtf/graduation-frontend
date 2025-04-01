import { CatalogOption } from '@/widgets/Catalog';

const URL_MAP: Record<CatalogOption, string> = {
    [CatalogOption.Supervisors]: 'supervisors',
    [CatalogOption.Topics]: 'topics',
    [CatalogOption.Students]: 'students',
};

export const getUrl = (option: CatalogOption): string => URL_MAP[option];
