import { AppRoutes, RoutePath } from 'app/providers/Router/config/routeConfig';

export const getInfoPagePath = (appRoute: AppRoutes, id: string) => `/${RoutePath[appRoute].split('/')[1]}/${id}`;
