import { CatalogOption } from '../../model';

export const getCatalogOptionsByRole = (isProfessor: boolean) =>
    isProfessor ? Object.values(CatalogOption).slice(1) : Object.values(CatalogOption);
