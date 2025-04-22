import { Role } from '@/entities/User';
import { RoutePath, RoutePathType } from '../../config/routeConfig';

export const getHomePageByRole = (role: Role): RoutePathType => {
    switch (role) {
        case Role.Admin:
            return RoutePath.Administration;
        case Role.HeadSecretary:
        case Role.Secretary:
        case Role.Expert:
            return RoutePath.MyStudents;
        case Role.Supervisor:
            return RoutePath.MyTopics;
        case Role.Student:
            return RoutePath.MyDiplom;
        default:
            return RoutePath.Login;
    }
};
