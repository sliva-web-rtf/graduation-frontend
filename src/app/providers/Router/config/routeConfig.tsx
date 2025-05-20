/* eslint-disable no-unused-vars */
import { Role } from '@/entities/User/';
import { AdminPage } from '@/pages/AdminPage';
import { CatalogPage } from '@/pages/CatalogPage';
import { CommissionsPage } from '@/pages/CommissionsPage';
import { CreateCommissionPage } from '@/pages/CreateCommissionPage';
import { CreateTopicPage } from '@/pages/CreateTopicPage';
import { DiplomPage } from '@/pages/DiplomPage';
import { EditCommissionPage } from '@/pages/EditCommissionPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { LoginPage } from '@/pages/LoginPage';
import { MyDiplomPage } from '@/pages/MyDiplomPage';
import { MyStudentsPage } from '@/pages/MyStudentsPage';
import { MyTopicsPage } from '@/pages/MyTopicsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RequestsPage } from '@/pages/RequestsPage';
import { StudentPage } from '@/pages/StudentPage';
import { SupervisorPage } from '@/pages/SupervisorPage';
import { TopicPage } from '@/pages/TopicPage';
import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    hasLayout?: boolean;
    roles?: Role[];
};

export enum AppRoutes {
    Login = 'Login',
    Forbidden = 'Forbidden',
    NotFound = 'NotFound',

    Catalog = 'Catalog',
    Supervisors = 'Supervisors',
    Topics = 'Topics',
    Students = 'Students',
    Profile = 'Profile',
    Requests = 'Requests',
    Diplom = 'Diplom',
    MyDiplom = 'MyDiplom',
    MyTopics = 'MyTopics',
    MyTopic = 'MyTopic',
    MyStudents = 'MyStudents',
    Commissions = 'Commissions',
    CreateComission = 'CreateComission',
    EditComission = 'EditComission',
    CreateTopic = 'CreateTopic',
    Administration = 'Administration',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.Administration]: '/administration',
    [AppRoutes.Login]: '/login',
    [AppRoutes.Supervisors]: '/supervisors/:id',
    [AppRoutes.Topics]: '/topics/:id',
    [AppRoutes.Students]: '/students/:id',
    [AppRoutes.Profile]: '/profile',
    [AppRoutes.Requests]: '/requests',
    [AppRoutes.MyDiplom]: '/diploma',
    [AppRoutes.Diplom]: '/diploma/:id',
    [AppRoutes.MyTopics]: '/my-topics',
    [AppRoutes.MyTopic]: '/my-topics/:id',
    [AppRoutes.MyStudents]: '/my-students',
    [AppRoutes.Commissions]: '/commissions',
    [AppRoutes.CreateComission]: '/commissions/create',
    [AppRoutes.EditComission]: '/commissions/edit/:id',
    [AppRoutes.CreateTopic]: '/create-topic',
    [AppRoutes.Catalog]: '/catalog',
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
        roles: [Role.Admin, Role.Supervisor, Role.Student],
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
        roles: [Role.Admin, Role.HeadSecretary, Role.Secretary, Role.Supervisor],
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
        roles: [Role.Admin, Role.HeadSecretary, Role.Secretary],
    },
    [AppRoutes.EditComission]: {
        path: RoutePath.EditComission,
        element: <EditCommissionPage />,
        ...withLayoutAndAuth,
        roles: [Role.Admin, Role.HeadSecretary, Role.Secretary],
    },
    [AppRoutes.Commissions]: {
        path: RoutePath.Commissions,
        element: <CommissionsPage />,
        ...withLayoutAndAuth,
        roles: [Role.Admin, Role.HeadSecretary, Role.Secretary],
    },
    [AppRoutes.CreateTopic]: {
        path: RoutePath.CreateTopic,
        element: <CreateTopicPage />,
        ...withLayoutAndAuth,
        roles: [Role.Supervisor, Role.Student],
    },
    [AppRoutes.MyDiplom]: {
        path: RoutePath.MyDiplom,
        element: <MyDiplomPage />,
        ...withLayoutAndAuth,
        roles: [Role.Student],
    },
    [AppRoutes.Diplom]: {
        path: RoutePath.Diplom,
        element: <DiplomPage />,
        ...withLayoutAndAuth,
        roles: [Role.HeadSecretary, Role.Secretary, Role.Supervisor, Role.Expert],
    },
    [AppRoutes.MyTopics]: {
        path: RoutePath.MyTopics,
        element: <MyTopicsPage />,
        ...withLayoutAndAuth,
        roles: [Role.Supervisor, Role.Student],
    },
    [AppRoutes.MyTopic]: {
        path: RoutePath.MyTopic,
        element: <TopicPage extended editable />,
        ...withLayoutAndAuth,
    },
    [AppRoutes.MyStudents]: {
        path: RoutePath.MyStudents,
        element: <MyStudentsPage />,
        ...withLayoutAndAuth,
        roles: [Role.Admin, Role.HeadSecretary, Role.Secretary, Role.Expert],
    },
    [AppRoutes.Administration]: {
        path: RoutePath.Administration,
        element: <AdminPage />,
        ...withLayoutAndAuth,
        roles: [Role.Admin, Role.HeadSecretary],
    },
    [AppRoutes.Forbidden]: {
        path: RoutePath.Forbidden,
        element: <ForbiddenPage />,
        hasLayout: true,
    },
    [AppRoutes.NotFound]: {
        path: RoutePath.NotFound,
        element: <NotFoundPage />,
        hasLayout: true,
    },
};
