import { RouteProps } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    Main = 'Main',
    Login = 'Login',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.Main]: '/main',
  [AppRoutes.Login]: '/login',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.Main]: {
    path: RoutePath.Main,
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.Login]: {
    path: RoutePath.Login,
    element: <LoginPage />,
    authOnly: false,
  },
};
