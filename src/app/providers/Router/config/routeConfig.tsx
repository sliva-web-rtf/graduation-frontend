import { RouteProps } from 'react-router-dom';
import { Typography } from '@mui/material';
import { LoginPage } from '@/pages/LoginPage';
import { CatalogPage } from '@/pages/CatalogPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { type Role } from '@/entities/User/model/types/role';
import { ProfessorPage } from '@/pages/ProfessorPage';
import { StudentPage } from '@/pages/StudentPage';
import { ScientificWorkPage } from '@/pages/ScientificWorkPage';
import { ManualPage } from '@/pages/ManualPage';
import { ManualArticlePage } from '@/pages/ManuaArticlelPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    hasLayout?: boolean;
    roles?: Role[];
};

export enum AppRoutes {
    Login = 'Login',
    Catalog = 'Catalog',
    About = 'About',
    Tasks = 'Tasks',
    NotFound = 'NotFound',
    Forbidden = 'Forbidden',
    Professors = 'Professors',
    ScientificWork = 'ScientificWork',
    Students = 'Students',
    Manual = 'Manual',
    ManualArticle = 'ManualArticle',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Login]: '/login',
    [AppRoutes.Catalog]: '/',
    [AppRoutes.Professors]: '/professors/:id',
    [AppRoutes.ScientificWork]: '/themes/:id',
    [AppRoutes.Students]: '/students/:id',
    [AppRoutes.Manual]: '/manual',
    [AppRoutes.ManualArticle]: '/manual/:id',
    [AppRoutes.About]: '/about',
    [AppRoutes.Tasks]: '/tasks',
    [AppRoutes.Forbidden]: '/forbidden',
    [AppRoutes.NotFound]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.Login]: {
        path: RoutePath.Login,
        element: <LoginPage />,
        authOnly: false,
    },
    [AppRoutes.Manual]: {
        path: RoutePath.Manual,
        element: <ManualPage />,
        hasLayout: true,
        authOnly: true,
    },
    [AppRoutes.ManualArticle]: {
        path: RoutePath.ManualArticle,
        element: <ManualArticlePage />,
        hasLayout: true,
        authOnly: true,
    },
    [AppRoutes.Catalog]: {
        path: RoutePath.Catalog,
        element: <CatalogPage />,
        hasLayout: true,
        authOnly: true,
    },
    [AppRoutes.Professors]: {
        path: RoutePath.Professors,
        element: <ProfessorPage />,
        hasLayout: true,
        authOnly: true,
    },
    [AppRoutes.ScientificWork]: {
        path: RoutePath.ScientificWork,
        element: <ScientificWorkPage />,
        hasLayout: true,
        authOnly: true,
    },
    [AppRoutes.Students]: {
        path: RoutePath.Students,
        element: <StudentPage />,
        hasLayout: true,
        authOnly: true,
    },
    [AppRoutes.About]: {
        path: RoutePath.About,
        element: <Typography variant="h1">Об исследовании</Typography>,
        hasLayout: true,
        authOnly: true,
    },
    [AppRoutes.Tasks]: {
        path: RoutePath.Tasks,
        element: <Typography variant="h1">Задачи</Typography>,
        hasLayout: true,
        authOnly: true,
    },
    [AppRoutes.Forbidden]: {
        path: RoutePath.Forbidden,
        element: <ForbiddenPage />,
        hasLayout: true,
        authOnly: true,
    },
    [AppRoutes.NotFound]: {
        path: RoutePath.NotFound,
        element: <NotFoundPage />,
        authOnly: true,
        hasLayout: true,
    },
};
