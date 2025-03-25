import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import { CatalogOption } from '@/widgets/Catalog';

export const getParentLink = (option: CatalogOption) => {
    let path = '';
    switch (option) {
        case CatalogOption.Managers:
            path = RoutePath.Managers;
            break;
        case CatalogOption.Topics:
            path = RoutePath.Topics;
            break;
        default:
            path = RoutePath.Students;
            break;
    }

    return path.split('/')[1];
};
