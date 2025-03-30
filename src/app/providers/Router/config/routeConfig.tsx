/* eslint-disable no-unused-vars */
import { RouteProps } from 'react-router-dom';
import { type Role } from '@/entities/User/model/types/role';
import { CatalogPage } from '@/pages/CatalogPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { LoginPage } from '@/pages/LoginPage';
import { MyDimpomPage } from '@/pages/MyDimpomPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfessorPage } from '@/pages/ProfessorPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RequestsPage } from '@/pages/RequestsPage';
import { StudentPage } from '@/pages/StudentPage';
import { TestPage } from '@/pages/TestPage';
import { TopicPage } from '@/pages/TopicPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    hasLayout?: boolean;
    roles?: Role[];
};

export enum AppRoutes {
    Login = 'Login',
    Catalog = 'Catalog',
    Managers = 'Managers',
    Topics = 'Topics',
    Students = 'Students',
    Profile = 'Profile',
    Forbidden = 'Forbidden',
    NotFound = 'NotFound',
    Test = 'Test',
    Requests = 'Requests',
    MyDiplom = 'MyDiplom',
    MyGuides = 'MyGuides',
    MyStudents = 'MyStudents',
    Commissions = 'Commissions',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Test]: '/test',
    [AppRoutes.Login]: '/login',
    [AppRoutes.Managers]: '/manager/:id',
    [AppRoutes.Topics]: '/topics/:id',
    [AppRoutes.Students]: '/students/:id',
    [AppRoutes.Profile]: '/profile',
    [AppRoutes.Requests]: '/requests',
    [AppRoutes.MyDiplom]: '/my-dimplom',
    [AppRoutes.MyGuides]: '/my-guides',
    [AppRoutes.MyStudents]: '/my-students',
    [AppRoutes.Commissions]: '/commissions',
    [AppRoutes.Catalog]: '/',
    [AppRoutes.Forbidden]: '/forbidden',
    [AppRoutes.NotFound]: '*',
};

const withLayoutAndAuth = {
    hasLayout: true,
    authOnly: true,
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.Login]: {
        path: RoutePath.Login,
        element: <LoginPage />,
        authOnly: false,
    },
    [AppRoutes.Catalog]: {
        path: RoutePath.Catalog,
        element: <CatalogPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.Profile]: {
        path: RoutePath.Profile,
        element: <ProfilePage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.Managers]: {
        path: RoutePath.Managers,
        element: <ProfessorPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.Topics]: {
        path: RoutePath.Topics,
        element: <TopicPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.Students]: {
        path: RoutePath.Students,
        element: <StudentPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.Forbidden]: {
        path: RoutePath.Forbidden,
        element: <ForbiddenPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.NotFound]: {
        path: RoutePath.NotFound,
        element: <NotFoundPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.Requests]: {
        path: RoutePath.Requests,
        element: <RequestsPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.Commissions]: {
        path: RoutePath.Commissions,
        element: <>Комиссии</>,
        ...withLayoutAndAuth,
    },
    [AppRoutes.MyDiplom]: {
        path: RoutePath.MyDiplom,
        element: <MyDimpomPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.MyGuides]: {
        path: RoutePath.MyGuides,
        element: <>Мои руководства</>,
        ...withLayoutAndAuth,
    },
    [AppRoutes.MyStudents]: {
        path: RoutePath.MyStudents,
        element: <>Мои студенты</>,
        ...withLayoutAndAuth,
    },
    [AppRoutes.Test]: {
        path: RoutePath.Test,
        element: <TestPage />,
        ...withLayoutAndAuth,
    },
};
