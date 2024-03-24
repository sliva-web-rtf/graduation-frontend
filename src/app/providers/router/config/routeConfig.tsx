import { RouteProps } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage';
import { CatalogPage } from 'pages/CatalogPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ForbiddenPage } from 'pages/ForbiddenPage';
import { Role } from 'entities/User/model/types/roles';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  hasLayout?: boolean;
  roles?: Role[],
}

export enum AppRoutes {
  Login = 'Login',
  Catalog = 'Catalog',
  About = 'About',
  Tasks = 'Tasks',
  NotFound = 'NotFound',
  Fobidden = 'Forbidden',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.Login]: '/login',
  [AppRoutes.Catalog]: '/catalog',
  [AppRoutes.About]: '/about',
  [AppRoutes.Tasks]: '/tasks',
  [AppRoutes.Fobidden]: '/forbidden',
  [AppRoutes.NotFound]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.Login]: {
    path: RoutePath.Login,
    element: <LoginPage />,
    authOnly: false,
  },
  [AppRoutes.Catalog]: {
    path: `${RoutePath.Catalog}`,
    element: <CatalogPage />,
    hasLayout: true,
    authOnly: true,
  },
  [AppRoutes.About]: {
    path: `${RoutePath.About}`,
    element: <div>123</div>,
    hasLayout: true,
    authOnly: true,
  },
  [AppRoutes.Tasks]: {
    path: `${RoutePath.Tasks}`,
    element: <div>123</div>,
    hasLayout: true,
    authOnly: true,
  },
  [AppRoutes.Fobidden]: {
    path: `${RoutePath.Forbidden}`,
    element: <ForbiddenPage />,
    hasLayout: true,
    authOnly: true,
  },
  [AppRoutes.NotFound]: {
    path: `${RoutePath.NotFound}`,
    element: <NotFoundPage />,
    authOnly: true,
    hasLayout: true,
  },
};
