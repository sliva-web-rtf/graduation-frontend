import { RoutePathType } from '@/app/providers/Router/config/routeConfig';

export const getInfoPagePath = (route: RoutePathType, id: string) => `/${route.split('/')[1]}/${id}`;
