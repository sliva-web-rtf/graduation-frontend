import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import { CatalogOption } from '@/widgets/Catalog';

export const getParentLink = (option: CatalogOption) => {
    let path = '';
    switch (option) {
        case CatalogOption.Professors:
            path = RoutePath.Professors;
            break;
        case CatalogOption.Themes:
            path = RoutePath.ScientificWork;
            break;
        default:
            path = RoutePath.Students;
            break;
    }

    return path.split('/')[1];
};
