import { RouteProps } from 'react-router-dom';
import { type Role } from '@/entities/User/model/types/role';
import { CatalogPage } from '@/pages/CatalogPage';
import { ConfirmEmailPage } from '@/pages/ConfirmEmailPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { LoginPage } from '@/pages/LoginPage';
import { ManualPage } from '@/pages/ManualPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { ProfessorPage } from '@/pages/ProfessorPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ScientificWorkPage } from '@/pages/ScientificWorkPage';
import { SignupPage } from '@/pages/SignupPage';
import { StudentPage } from '@/pages/StudentPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    hasLayout?: boolean;
    roles?: Role[];
};

export enum AppRoutes {
    Login = 'Login',
    Catalog = 'Catalog',
    NotFound = 'NotFound',
    Forbidden = 'Forbidden',
    Professors = 'Professors',
    ScientificWork = 'ScientificWork',
    Students = 'Students',
    Manual = 'Manual',
    // ManualArticle = 'ManualArticle',
    // About = 'About',
    // Tasks = 'Tasks',
    Onboarding = 'Onboarding',
    Signup = 'Signup',
    Profile = 'Profile',
    ConfirmEmail = 'ConfirmEmail',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Login]: '/login',
    [AppRoutes.Catalog]: '/',
    [AppRoutes.Professors]: '/professors/:id',
    [AppRoutes.ScientificWork]: '/themes/:id',
    [AppRoutes.Students]: '/students/:id',
    [AppRoutes.Manual]: '/manual',
    [AppRoutes.Forbidden]: '/forbidden',
    [AppRoutes.Onboarding]: '/onboarding',
    [AppRoutes.NotFound]: '*',
    [AppRoutes.Signup]: '/signup',
    [AppRoutes.Profile]: '/profile',
    [AppRoutes.ConfirmEmail]: '/signup/confirm-email',
    // [AppRoutes.ManualArticle]: '/manual/:id',
    // [AppRoutes.About]: '/about',
    // [AppRoutes.Tasks]: '/tasks',
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
    [AppRoutes.Onboarding]: {
        path: `${RoutePath.Onboarding}`,
        element: <OnboardingPage />,
        authOnly: true,
        hasLayout: false,
    },
    [AppRoutes.Signup]: {
        path: `${RoutePath.Signup}`,
        element: <SignupPage />,
        authOnly: false,
    },
    [AppRoutes.ConfirmEmail]: {
        path: `${RoutePath.ConfirmEmail}`,
        element: <ConfirmEmailPage />,
        authOnly: false,
    },
    // [AppRoutes.ManualArticle]: {
    //     path: RoutePath.ManualArticle,
    //     element: <ManualArticlePage />,
    //     hasLayout: true,
    //     authOnly: true,
    // },
    // [AppRoutes.About]: {
    //     path: RoutePath.About,
    //     element: <Typography variant="h1">Об исследовании</Typography>,
    //     hasLayout: true,
    //     authOnly: true,
    // },
    // [AppRoutes.Tasks]: {
    //     path: RoutePath.Tasks,
    //     element: <Typography variant="h1">Задачи</Typography>,
    //     hasLayout: true,
    //     authOnly: true,
    // },
};
