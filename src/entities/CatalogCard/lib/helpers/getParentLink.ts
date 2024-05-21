import { CatalogOptions } from 'entities/CatalogList';
import { RoutePath } from 'app/providers/Router/config/routeConfig';

export const getParentLink = (option: CatalogOptions) => {
    let path = '';
    switch (option) {
        case CatalogOptions.Professors:
            path = RoutePath.Professors;
            break;
        case CatalogOptions.Themes:
            path = RoutePath.ScientificWork;
            break;
        default:
            path = RoutePath.Students;
            break;
    }

    return path.split('/')[1];
};
