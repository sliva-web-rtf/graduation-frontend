import { Role } from '@/entities/User';
import { CatalogOption } from '../../model';

export const getCatalogOptionsForRoles = (roles: Role[]): CatalogOption[] => {
    const optionsSet = new Set<CatalogOption>();

    roles.forEach((role) => {
        switch (role) {
            case Role.Student:
                optionsSet.add(CatalogOption.Supervisors);
                optionsSet.add(CatalogOption.Topics);
                break;
            case Role.Supervisor:
                optionsSet.add(CatalogOption.Students);
                optionsSet.add(CatalogOption.Topics);
                break;
            default:
                break;
        }
    });

    return Array.from(optionsSet);
};
