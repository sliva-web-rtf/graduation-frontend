import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    Main = 'Main',
    Login = 'Login',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.Main]: '/',
  [AppRoutes.Login]: '/login',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.Main]: {
    path: RoutePath.Main,
    element: <MainPage />,
  },
  [AppRoutes.Login]: {
    path: `${RoutePath.Login}`,
    element: <div />,
    authOnly: true,
  },
};
