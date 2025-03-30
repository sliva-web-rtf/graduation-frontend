import { CatalogOption } from '@/widgets/Catalog';

const URL_MAP: Record<CatalogOption, string> = {
    [CatalogOption.Managers]: '/api/professor/list-professor',
    [CatalogOption.Topics]: '/api/scientificWork/list-scientific-works',
    [CatalogOption.Students]: '/api/student/list-students',
};

export const getUrl = (option: CatalogOption): string => URL_MAP[option];
