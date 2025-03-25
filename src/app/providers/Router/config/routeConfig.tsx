import { RouteProps } from 'react-router-dom';
import { type Role } from '@/entities/User/model/types/role';
import { CatalogPage } from '@/pages/CatalogPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfessorPage } from '@/pages/ProfessorPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ScientificWorkPage } from '@/pages/ScientificWorkPage';
import { SignupPage } from '@/pages/SignupPage';
import { StudentPage } from '@/pages/StudentPage';
import { TestPage } from '@/pages/TestPage';
// import { ConfirmEmailPage } from '@/pages/ConfirmEmailPage';
// import { ManualPage } from '@/pages/ManualPage';
// import { OnboardingPage } from '@/pages/OnboardingPage';

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
    Signup = 'Signup',
    Profile = 'Profile',
    Forbidden = 'Forbidden',
    NotFound = 'NotFound',
    Test = 'Test',
    // ConfirmEmail = 'ConfirmEmail',
    // Manual = 'Manual',
    // ManualArticle = 'ManualArticle',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Login]: '/login',
    [AppRoutes.Signup]: '/signup',
    [AppRoutes.Managers]: '/manager/:id',
    [AppRoutes.Topics]: '/topics/:id',
    [AppRoutes.Students]: '/students/:id',
    [AppRoutes.Profile]: '/profile',
    [AppRoutes.Test]: '/test',
    [AppRoutes.Catalog]: '/',
    [AppRoutes.Forbidden]: '/forbidden',
    [AppRoutes.NotFound]: '*',
    // [AppRoutes.ConfirmEmail]: '/signup/confirm-email',
    // [AppRoutes.Manual]: '/manual',
    // [AppRoutes.ManualArticle]: '/manual/:id',
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
        hasLayout: true,
        authOnly: true,
    },
    [AppRoutes.Profile]: {
        path: RoutePath.Profile,
        element: <ProfilePage />,
        hasLayout: true,
        authOnly: true,
    },
    [AppRoutes.Managers]: {
        path: RoutePath.Managers,
        element: <ProfessorPage />,
        hasLayout: true,
        authOnly: true,
    },
    [AppRoutes.Topics]: {
        path: RoutePath.Topics,
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
    // [AppRoutes.Signup]: {
    //     path: `${RoutePath.Signup}`,
    //     element: <SignupPage />,
    //     authOnly: false,
    // },
    [AppRoutes.Test]: {
        path: RoutePath.Test,
        element: <TestPage />,
        hasLayout: true,
        authOnly: true,
    },
};
