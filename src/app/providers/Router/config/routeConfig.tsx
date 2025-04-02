/* eslint-disable no-unused-vars */
import { type Role } from '@/entities/User/model/types/role';
import { CatalogPage } from '@/pages/CatalogPage';
import { CommissionsPage } from '@/pages/CommissionsPage';
import { CreateCommissionPage } from '@/pages/CreateCommissionPage';
import { CreateTopicPage } from '@/pages/CreateTopicPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { LoginPage } from '@/pages/LoginPage';
import { MyDimpomPage } from '@/pages/MyDimpomPage';
import { MyStudentsPage } from '@/pages/MyStudentsPage';
import { MyTopicsPage } from '@/pages/MyTopicsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RequestsPage } from '@/pages/RequestsPage';
import { StudentPage } from '@/pages/StudentPage';
import { SupervisorPage } from '@/pages/SupervisorPage';
import { TestPage } from '@/pages/TestPage';
import { TopicPage } from '@/pages/TopicPage';
import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    hasLayout?: boolean;
    roles?: Role[];
};

export enum AppRoutes {
    Login = 'Login',
    Catalog = 'Catalog',
    Supervisors = 'Supervisors',
    Topics = 'Topics',
    Students = 'Students',
    Profile = 'Profile',
    Forbidden = 'Forbidden',
    NotFound = 'NotFound',
    Test = 'Test',
    Requests = 'Requests',
    MyDiplom = 'MyDiplom',
    MyTopics = 'MyTopics',
    MyStudents = 'MyStudents',
    Commissions = 'Commissions',
    CreateComission = 'CreateComission',
    CreateTopic = 'CreateTopic',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Test]: '/test',
    [AppRoutes.Login]: '/login',
    [AppRoutes.Supervisors]: '/supervisors/:id',
    [AppRoutes.Topics]: '/topics/:id',
    [AppRoutes.Students]: '/students/:id',
    [AppRoutes.Profile]: '/profile',
    [AppRoutes.Requests]: '/requests',
    [AppRoutes.MyDiplom]: '/my-dimplom',
    [AppRoutes.MyTopics]: '/my-topics',
    [AppRoutes.MyStudents]: '/my-students',
    [AppRoutes.Commissions]: '/commissions',
    [AppRoutes.CreateComission]: '/commissions/create',
    [AppRoutes.CreateTopic]: '/create-topic',
    [AppRoutes.Catalog]: '/',
    [AppRoutes.Forbidden]: '/forbidden',
    [AppRoutes.NotFound]: '*',
};

export type RoutePathType = (typeof RoutePath)[keyof typeof RoutePath];

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
    [AppRoutes.Supervisors]: {
        path: RoutePath.Supervisors,
        element: <SupervisorPage />,
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
    [AppRoutes.CreateComission]: {
        path: RoutePath.CreateComission,
        element: <CreateCommissionPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.Commissions]: {
        path: RoutePath.Commissions,
        element: <CommissionsPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.CreateTopic]: {
        path: RoutePath.CreateTopic,
        element: <CreateTopicPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.MyDiplom]: {
        path: RoutePath.MyDiplom,
        element: <MyDimpomPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.MyTopics]: {
        path: RoutePath.MyTopics,
        element: <MyTopicsPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.MyStudents]: {
        path: RoutePath.MyStudents,
        element: <MyStudentsPage />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.Test]: {
        path: RoutePath.Test,
        element: <TestPage />,
        ...withLayoutAndAuth,
    },
};
